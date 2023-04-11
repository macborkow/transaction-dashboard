package com.example.backend.services;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import com.example.backend.models.Json;

@Service
public class JsonService {
    public Json getCustomers() throws IOException {
        String data = StreamUtils.copyToString(
                getClass().getResourceAsStream("/customers.json"),
                StandardCharsets.UTF_8
        );
        return new Json(data);
    }

    public Json getTransactions() throws IOException {
        String data = StreamUtils.copyToString(
                getClass().getResourceAsStream("/transactions.json"),
                StandardCharsets.UTF_8
        );
        return new Json(data);
    }
}

