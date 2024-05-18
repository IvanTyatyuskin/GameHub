import React, { useState } from "react"
import { CardView, ThisPlayerView, PlayerView } from "./Classes"
import TestImg from  "./assets/react.svg"


export const textDataToView = [
    {
        placeBet: 'Сделать ставку',
        skip: 'Пасс',
        ItRemainsToTurnItOver : 'Остальсь пеервернуть'
    }
]

export function TestCard1(){
    return new CardView(
            "1",        //Type
            ()=>{},     //Onclick
            true,      //Active
            true        //Disabled
    )}

export function TestCard0() {
    return new CardView(
            "0",        //Type
            ()=>{},     //Onclick
            true,      //Active
            true        //Disabled
    )}

export const TestDataPlayers = [
    new PlayerView(
        1,      //id
        "Игрок 1",  //Name
        TestImg,   //Img
        0,      //VP
        1,     //CardsDown
        [
            TestCard0(),
            //TestCard1()
        ],      //OpenCards
        true,   //IsActive
        ()=>{},  //Onclick
    ),
    new PlayerView(
        2,      //id
        "Игрок 2",  //Name
        TestImg,   //Img
        1,      //VP
        2,     //CardsDown
        [/*
            TestCard1(),
            TestCard0()
        */],      //OpenCards
        true,   //IsActive
        ()=>{},  //Onclick
    ),
    new PlayerView(
        3,      //id
        "Игрок 3",  //Name
        TestImg,   //Img
        1,      //VP
        0,     //CardsDown
        [
            TestCard0(),
            TestCard0()
        ],      //OpenCards
        false,   //IsActive
        ()=>{},  //Onclick
    ),
]

export const TestDataThisPlayer = () =>
    { 
        var [inputValue, setInputValue] = useState('');
        return new ThisPlayerView(
            1,          //Id
            [
                TestCard0(),
                //TestCard0(),
                //TestCard0(),
                TestCard1()
            ],          //ViewCards
            true,       //Active
            0,          //WinPoints
            3,          //Bet
            ()=>{},     //UpdateBet
            5,       //UpdateIsFlipping
            ()=>{},     //Pass
            inputValue,         //InputValue
            setInputValue,     //SetInputValue
            true,      //WinWindow
            '3'         //Phase
        )
}