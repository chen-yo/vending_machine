package com.eyenet.VendingMachine.controllers;

import com.eyenet.VendingMachine.exceptions.InsufficientFundsException;
import com.eyenet.VendingMachine.models.Drink;
import com.eyenet.VendingMachine.models.MachineState;
import com.eyenet.VendingMachine.services.AppService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
class FundAmount {
    public int amount;
}

@AllArgsConstructor
@NoArgsConstructor
class PurchaseRequestBody {
    Map<Integer, Integer> drinkId2Quantity;
}

@RestController
@RequestMapping("api")
public class AppController {

    @Autowired
    private AppService appService;

    @RequestMapping(value = "/getMachineState", method = RequestMethod.GET)
    public ResponseEntity<MachineState> getState() {
        return new ResponseEntity<>(appService.getMachineState(), HttpStatus.OK);
    }

    @RequestMapping(value = "/funds", method = RequestMethod.GET)
    public ResponseEntity<?> getFunds() {
        return new ResponseEntity<>(appService.getMachineState().getFunds(), HttpStatus.OK);
    }

    @RequestMapping(value = "/funds/deposit", method = RequestMethod.POST)
    public ResponseEntity<?> depositFunds(@RequestBody FundAmount fundAmountBody) {
        appService.getMachineState().depositFunds(fundAmountBody.amount);
        return new ResponseEntity<>(appService.getMachineState().getFunds(), HttpStatus.OK);
    }

    @RequestMapping(value = "/purchase", method = RequestMethod.POST)
    public ResponseEntity<?> purchase(@RequestBody Map<Integer, Integer> drinkId2Quantity) {
        try {
            int currentFunds = appService.getMachineState().purchase(drinkId2Quantity);
            return new ResponseEntity<>(currentFunds, HttpStatus.OK);
        } catch (InsufficientFundsException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/funds/pullAll", method = RequestMethod.GET)
    public ResponseEntity<?> pullAll() {
        return new ResponseEntity<>(appService.getMachineState().pullAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/save", method = RequestMethod.GET)
    public ResponseEntity<?> save() {
        appService.save();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/load", method = RequestMethod.GET)
    public ResponseEntity<?> load() {
        appService.load();
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
