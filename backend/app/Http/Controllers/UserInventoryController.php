<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Item;
use App\Models\UserRegister;
use App\Models\UserInventory;
use Illuminate\Http\Request;

class UserInventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //商品ページ用　個別の商品データを受け取ったidで検索して返す
        $item = Item::find($request['data']['itemId'], 'item_id')->first();;
        $user = UserRegister::where('user_firebase_id', $request['data']['userId'])->first();


        $userInventry = new UserInventory;
            $userInventry->user_id = $user->user_id; // ユーザーIDを設定
            $userInventry->item_id = $item->item_id; // 商品IDを設定
            $userInventry->save();
        
        return response()->json(['message' => 'userInventry update successfully']);
}      

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //UserInventoryテーブルからuser_idを検索し、対応する商品を取得
        Log::info($id);
        $user = UserRegister::where('user_firebase_id', $id)->first();


        $userInventryDatas = UserInventory::where('user_id', $user->user_id)->with(['items'])->get();
        Log::info($userInventryDatas);


        return response()->json($userInventryDatas, 200);



    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
