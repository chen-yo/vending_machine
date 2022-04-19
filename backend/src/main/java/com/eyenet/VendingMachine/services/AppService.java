package com.eyenet.VendingMachine.services;

import com.eyenet.VendingMachine.models.MachineState;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.util.List;
import java.util.stream.Stream;

@Service
public class AppService {

    private MachineState machineState = new MachineState();

    AppService() {
        super();
    }

    public MachineState getMachineState() {
        return this.machineState;
    }

    public void save() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Resource resource = new ClassPathResource("data.json");
            File file = resource.getFile();
            objectMapper.writeValue(file, machineState);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void load() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(JsonParser.Feature.AUTO_CLOSE_SOURCE, true);
        StringBuilder fileContent = new StringBuilder();

        try {
            Resource resource = new ClassPathResource("data.json");
            File file = resource.getFile();
            Stream<String> stream = Files.lines(file.toPath());
            stream.forEach(s -> fileContent.append(s).append("\n"));
            System.out.println(fileContent.toString());
            this.machineState = objectMapper.readValue(fileContent.toString(), MachineState.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
