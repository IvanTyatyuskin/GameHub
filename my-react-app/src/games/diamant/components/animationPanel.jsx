//import React from 'react'
import { useEffect, useState } from 'react';
import styles from './animationPanel.module.css'
import { InputText2 } from '../../../Components/common/Input';
import Button from '../../../Components/common/button';

export function useCoord(initialValue = [0,0]){
    const [X, setX] = useState(initialValue[0]);
    const [Y, setY] = useState(initialValue[1]);
    return {
        coord:{
            X:{
                get:X, 
                set:setX
            }, 
            Y:{
                get:Y, 
                set:setY
            }
        }
    }
}


export function createRoute(x, y, pointX, pointY){
    if (pointX >= x || pointY >= y) return null;
    const coordinates = [];
    let pointReached = false;
    function compare(i, j){
        //console.log(`Comparing (${i}, ${j}) with (${pointX}, ${pointY})`);
        if (i === pointX && j === pointY){
            //console.log("Point reached!");
            pointReached = true;
            return true;
        }
        return false;
    }
    for (let j = 0; j < y; j++) {
        if (j % 2 === 0) {
            for (let i = 0; i < x; i++) {
                coordinates.push([i, j]);
                if (compare(i,j)) break;
            }
        } else {
            for (let i = x - 1; i >= 0; i--) {
                coordinates.push([i, j]);
                if (compare(i,j)) break;
            }
        }
        if (pointReached) break;
    }

    const result = coordinates.reverse();
    result.push([-1, 0]);
    return result;
}


export function useCell(initialValue = [[0,0],['--widht-pos','--height-pos']]){
    const {coord} = useCoord(initialValue[0])

    //const [cellPosition, setCellPosition] = useState(
    //    {
    //        [initialValue[1][0]]: coord.X.get,
    //        [initialValue[1][1]]: coord.Y.get
    //    }
    //)

    let newPosition = {
        [initialValue[1][0]]: coord.X.get,
        [initialValue[1][1]]: coord.Y.get
    };
    useEffect(()=>{
        newPosition = {
            [initialValue[1][0]]: coord.X.get,
            [initialValue[1][1]]: coord.Y.get
        };
        //setCellPosition(newPosition);
    }, [initialValue])

    return [coord, newPosition]
}

export const AnimationPanel = () =>{
    const SquareSize = '120px';
    const widthCount = 5;
    const heightCount = 5;

    const constValueStyle = {
        '--Square-size': SquareSize,
        '--height-count': heightCount,
        '--widht-count': widthCount,
    };

    const [coordMainCell, mainCellStyle] = useCell([[0,0],['--widht-pos','--height-pos']]);
    const [coordHomeCell, homeCellStyle] = useCell([[0,0],['--widht-pos-home','--height-pos-home']]);
    const [homeVisible, setHomeVisible] = useState(false);

    const [cellContent, setCellContent] = useState([]);
    const [homeCellContent, setHomeCellContent] = useState([]);

    //setCellContent([
    //    <p key='1'>1</p>,
    //    <div key='2' className={styles.point}/>,
    //    <h1 key='4'>123</h1>
    //])
    //setHomeCellContent([<p key='1'>1</p>])

    const GoHome = () => {
        const pointX = parseInt(coordMainCell.X.get);
        const pointY = parseInt(coordMainCell.Y.get);
        const route = createRoute(widthCount, heightCount, pointX, pointY);
        //const values = [];
        //const count =  cellContent.length;
        //for (let i = 0; i >= count; i++){
        //    if (i === cellContent.length-1) setHomeCellContent(cellContent[i]);
        //    else values.push(cellContent[i]);
        //}
        //setCellContent(values);
        
        if (route && route.length > 0) {
            //setHomeVisible(true);
            //coordHomeCell.X.set(route[0][0]);
            //coordHomeCell.Y.set(route[0][1]);

            const speed = 200; // Скорость анимации в миллисекундах
            route.forEach((point, index) => {
                if (Array.isArray(point)) {
                    const [newX, newY] = point;
                    setTimeout(() => {
                        coordHomeCell.X.set(newX);
                        coordHomeCell.Y.set(newY);
                        if (index === 0) {
                            setHomeVisible(true);
                        }
                        if (index === route.length - 1) {
                            setTimeout(() => setHomeVisible(false), speed); // Скрыть после завершения
                        }
                    }, index * speed);
                }
            });
            //setHomeVisible(false);
        }
    }

    return (
        <>
            <div className={styles.root} style={constValueStyle}>
                <div style={{ width:"200px", height: "200px" }}>
                    <InputText2 value={coordMainCell.X.get} setValue={coordMainCell.X.set}/>
                    <InputText2 value={coordMainCell.Y.get} setValue={coordMainCell.Y.set}/>
                    <Button onClick={GoHome}>go home</Button>
                </div>
                <div className={styles.canvas}>
                    <div className={styles.cell} style={mainCellStyle}>
                        {cellContent.map((item) => {return (item)})}
                    </div>
                    <div className={`${styles.cell} ${styles.home}`} style={{...homeCellStyle, display: (homeVisible? 'block': 'none')}}>
                        {homeCellContent.map((item)=>{return(item)})}
                    </div>
                </div>
            </div>
        </>
    )
}