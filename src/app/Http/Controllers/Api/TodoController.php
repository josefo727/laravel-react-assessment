<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Todo;
use Illuminate\Http\Request;
use App\Http\Requests\TodoRequest;
use Illuminate\Support\Collection;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $username = $request->input('username');

        if (!$username) {
            return new Collection();
        }

        $user = User::findByUsernameOrCreate($username);

        if (!$user) return new Collection();

        return $user->todos;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TodoRequest $request)
    {
        $username = $request->input('username');

        $user = User::findByUsernameOrCreate($username);

        $todo = $user->todos()->create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'is_completed' => $request->input('is_completed', false),
        ]);

        return response()->json($todo, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TodoRequest $request, Todo $todo)
    {
        $todo->update([
            'title' => $request->input('title', $todo->title),
            'description' => $request->input('description', $todo->description),
            'is_completed' => $request->input('is_completed', $todo->is_completed),
        ]);

        return response()->json($todo, 200);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response()->json(['message' => 'Todo deleted successfully'], 204);
    }
}
