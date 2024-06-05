<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
          'tel' => ['required', 'string', 'max:255', 'unique:users', 'regex:/^([0-9\s\-\+\(\)]*)$/'],
          'fullname' => ['required', 'string', 'max:255'],
          'age' => ['required', 'integer', 'max:255'],
          'email' => ['required', 'email', 'string', 'max:255', 'unique:users'],
          'pass' => ['required', 'string', 'min:8', 'confirmed'],
          'role' => ['required', 'in:1,2'],
        ]);

        $user = User::create([
            'tel' => $request->tel,
            'fullname' => $request->fullname,
            'age' => $request->age,
            'email' => $request->email,
            'password' => Hash::make($request->pass),
            'user_type_id' => $request->role,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
