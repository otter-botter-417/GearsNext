<?php

namespace Tests\Feature;

use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class HomeControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
        Item::factory(10)->create();
    }


    /**
     * ホーム画面の表示
     * @covers \App\Http\Controllers\HomeController::index
     */
    public function test_can_display_home_screen()
    {
        $response = $this->get('/api/home');
        $response->assertStatus(200);
    }
}
