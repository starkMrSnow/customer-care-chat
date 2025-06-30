FROM eclipse-temurin:24-jdk

WORKDIR /app

COPY target/chat-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8010

ENTRYPOINT ["java", "-jar", "app.jar"]