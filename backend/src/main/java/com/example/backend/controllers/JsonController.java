package com.example.backend.controllers;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Json;
import com.example.backend.services.JsonService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class JsonController {
    private final JsonService jsonService;

    @GetMapping("/customers")
    public Json getCustomers() throws IOException {
        return jsonService.getCustomers();
    }

    @GetMapping("/transactions")
    public Json getTransactions() throws IOException {
        return jsonService.getTransactions();
    }
}
