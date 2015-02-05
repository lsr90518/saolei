package com.cyberagent.saolei.com.cyberagent.saolei.service;

import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.*;

/**
 * Created by Lsr on 2/5/15.
 */

@Service
public class GameService {

    public static int gameStatus; //1.start 2.pause 3.over

    public static int mapSize = 5;

    public static int mineMap[][] = new int[5][5];
    public static int numberMap[][] = new int[5][5];
    public static int flagMap[][] = new int[5][5];
    public static int helpMap[][] = new int[7][7];

    public static int mineCount = 5;

    Random random = new Random();

    public int[][] gameStart() {
        gameStatus = 1;
        initialMap();//static map, dynamic map
        return mineMap;
    }

    private void initialMap() {
        List<Integer> locationList = new ArrayList<Integer>(mapSize);
        int count = 0;
        while(true){

            if(count < mineCount){

                int location = random.nextInt(mapSize * mapSize);

                if(!locationList.contains(location)){
                    //save mine location to list
                    locationList.add(location);

                    //locate mine into map
                    int x = location % mapSize;
                    int y = location / mapSize;
                    mineMap[x][y] = 1;

                    count++;
                } else {
                    continue;
                }
            } else {
                break;
            }
        }

    }

}
