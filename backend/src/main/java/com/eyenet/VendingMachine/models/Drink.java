package com.eyenet.VendingMachine.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Drink {
    private int id;
    private String name;
    private int cost;
}