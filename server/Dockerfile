FROM maven:3.9.9-amazoncorretto-21 AS base

FROM base AS deps
WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline -B

EXPOSE 8080
CMD ["./mvnw", "spring-boot:run"]
