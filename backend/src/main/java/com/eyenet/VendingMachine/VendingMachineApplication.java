package com.eyenet.VendingMachine;

import com.eyenet.VendingMachine.services.AppService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextStoppedEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class VendingMachineApplication {

    @EventListener({ApplicationReadyEvent.class})
    public void onApplicationStart(final ApplicationReadyEvent event) {
        ApplicationContext ctx = event.getApplicationContext();
        AppService appService = ctx.getBean(AppService.class);
        appService.load();
    }

    @EventListener({ContextClosedEvent.class})
    public void onApplicationStop(final ContextClosedEvent event) {
        ApplicationContext ctx = event.getApplicationContext();
        AppService appService = ctx.getBean(AppService.class);
        appService.save();
    }

    public static void main(String[] args) {
        SpringApplication.run(VendingMachineApplication.class, args);
    }

}
