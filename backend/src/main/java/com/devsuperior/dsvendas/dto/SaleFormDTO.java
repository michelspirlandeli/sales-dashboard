package com.devsuperior.dsvendas.dto;

import java.time.LocalDate;

public class SaleFormDTO {

    private Long sellerId;
    private Integer visited;
    private Integer deals;
    private Double amount;
    private LocalDate date;

    public SaleFormDTO() {
    }

    public Long getSellerId() { return sellerId; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }

    public Integer getVisited() { return visited; }
    public void setVisited(Integer visited) { this.visited = visited; }

    public Integer getDeals() { return deals; }
    public void setDeals(Integer deals) { this.deals = deals; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}