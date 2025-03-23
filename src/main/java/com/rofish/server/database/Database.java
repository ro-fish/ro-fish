package com.rofish.server.database;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import javax.xml.crypto.Data;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class Database {
    private static Database db;
    private static final String USERS_FILE = "database/users.json";
    private static Map<String, User> users ;
    private static ObjectMapper objectMapper = new ObjectMapper();

    private Database() {
        loadDatabase();
    }

    public static Database getDb() {
        if (db == null) {
            db = new Database();
        }
        return db;
    }

    public Map<String, User> getUsers() {
        return users;
    }

    private static void loadDatabase() {
        try {
            if (Files.exists(Paths.get(USERS_FILE))) {
                ArrayList<User> usersList = objectMapper.readValue(new File(USERS_FILE), new TypeReference<ArrayList<User>>() {});

                users = usersList.stream()
                        .collect(Collectors.toMap(User::getEmail, user -> user));

            } else {
                System.out.println("Database file not found, creating new database");
                users = new HashMap<>();
            }
        } catch (IOException e) {
            e.printStackTrace();
            users = new HashMap<>();
        }
    }

    private void saveDatabase() {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(USERS_FILE),
                    users.entrySet().stream()
                    .map(Map.Entry::getValue)
                    .collect(Collectors.toList()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void addUser(User user) {
        users.put(user.getEmail(), user);
        saveDatabase();
    }

    public User findUser(String email) {
        if (users.containsKey(email)) {
            System.out.println("User found: " + users.get(email).getName());
            return users.get(email);
        } else {
            System.out.println("User not found");
            return null;
        }
    }

    public static void main(String[] args) {
        Database db = new Database();
        Map<String, User> users = db.getUsers();
        for (Map.Entry<String, User> user : users.entrySet()) {
            System.out.println(user.getKey());
        }
    }
}
