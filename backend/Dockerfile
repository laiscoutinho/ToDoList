# Stage 1: Build
FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

# Copia mvnw, .mvn, pom.xml e src
COPY backend/mvnw .
COPY backend/.mvn ./.mvn
COPY backend/pom.xml .
COPY backend/src ./src

RUN chmod +x mvnw

# Build do projeto (gera JAR)
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copia JAR do stage de build
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Variáveis de ambiente do Firebase
ENV FIREBASE_API_KEY=""
ENV FIREBASE_CREDENTIALS_PATH=""

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]