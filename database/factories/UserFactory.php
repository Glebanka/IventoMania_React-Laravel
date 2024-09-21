<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'tel' => '89010101010',
            'fullname' => 'admin',
            'age' => $this->faker->numberBetween(18, 65),
            'email' => $this->faker->unique()->safeEmail,
            'password' => Hash::make('password'),
            'user_type_id' => 3,
        ];
    }
}

