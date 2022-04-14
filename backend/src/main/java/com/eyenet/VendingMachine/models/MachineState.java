package com.eyenet.VendingMachine.models;

import com.eyenet.VendingMachine.exceptions.InsufficientFundsException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class MachineState {
    @Getter
    @Setter
    private int funds;

    @Getter
    @Setter
    private Map<Integer, Drink> drinks = new HashMap<>(3);

    public MachineState() {
    }

    public void depositFunds(int amount) {
        this.funds = this.funds + amount;
    }

    public int pullAll() {
        final int yourFunds = this.funds;
        this.funds = 0;
        return yourFunds;
    }

    public int purchase(Map<Integer, Integer> drinkId2Quantity) throws InsufficientFundsException {
        int cost = 0;

        for (int id : drinkId2Quantity.keySet()) {
            int drinkPrice = drinks.get(id).getCost();
            int quantity = drinkId2Quantity.get(id);
            cost += drinkPrice * quantity;
        }

        if (this.funds - cost < 0) {
            throw new InsufficientFundsException("Insufficient funds, reduce quantity or deposit more funds");
        }

        this.funds -= cost;
        return this.funds;
    }
}