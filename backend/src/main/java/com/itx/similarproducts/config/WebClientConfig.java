package com.itx.similarproducts.config;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;
import reactor.netty.resources.ConnectionProvider;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableConfigurationProperties(ProductApiProperties.class)
public class WebClientConfig {

    @Bean
    public WebClient productApiWebClient(ProductApiProperties properties) {
        ConnectionProvider connectionProvider = ConnectionProvider.builder("product-api")
                .maxConnections(properties.getMaxConnections())
                .pendingAcquireMaxCount(-1)
                .build();

        HttpClient httpClient = HttpClient.create(connectionProvider)
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, (int) properties.getConnectTimeout().toMillis())
                .responseTimeout(properties.getResponseTimeout())
                .doOnConnected(connection -> connection.addHandlerLast(
                        new ReadTimeoutHandler(properties.getResponseTimeout().toMillis(), TimeUnit.MILLISECONDS)));

        return WebClient.builder()
                .baseUrl(properties.getBaseUrl())
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }
}
