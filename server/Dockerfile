## Download dependencies
FROM eclipse-temurin:24-jdk-alpine AS deps
WORKDIR /build

COPY mvnw mvnw
COPY .mvn/ .mvn/

# Cache Maven dependencies
RUN --mount=type=bind,source=pom.xml,target=pom.xml \
    --mount=type=cache,target=/root/.m2 ./mvnw dependency:go-offline -DskipTests


## Pack the application as 'app.jar'
FROM deps AS package
WORKDIR /build


COPY ./src src/
RUN --mount=type=bind,source=pom.xml,target=pom.xml \
    --mount=type=cache,target=/root/.m2 ./mvnw package -DskipTests && \
    cp target/$(./mvnw help:evaluate -Dexpression=project.artifactId -q -DforceStdout)-$(./mvnw help:evaluate -Dexpression=project.version -q -DforceStdout).jar \
    target/app.jar


## Extract app layers
FROM package AS extract
WORKDIR /build
RUN java -Djarmode=layertools -jar target/app.jar extract --destination target/extracted


## Run the app
FROM eclipse-temurin:24-jre-alpine AS runtime
WORKDIR /app

COPY --from=extract build/target/extracted/dependencies/ ./
COPY --from=extract build/target/extracted/spring-boot-loader/ ./
COPY --from=extract build/target/extracted/snapshot-dependencies/ ./
COPY --from=extract build/target/extracted/application/ ./

EXPOSE 8080
ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"] 
