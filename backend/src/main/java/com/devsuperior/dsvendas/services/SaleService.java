package com.devsuperior.dsvendas.services;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.dto.SaleFormDTO;
import com.devsuperior.dsvendas.dto.SaleSuccessDTO;
import com.devsuperior.dsvendas.dto.SaleSumDTO;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.repositories.SaleRepository;
import com.devsuperior.dsvendas.repositories.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SellerRepository sellerRepository;

    @Transactional(readOnly = true)
    public Page<SaleDTO> findAll(Pageable pageable) {
        Page<Sale> result = saleRepository.findAll(pageable);
        return result.map(SaleDTO::new);
    }

    @Transactional(readOnly = true)
    public List<SaleSumDTO> amountGroupBySeller() {
        return saleRepository.amountGroupBySeller();
    }

    @Transactional(readOnly = true)
    public List<SaleSuccessDTO> successGroupBySeller() {
        return saleRepository.successGroupBySeller();
    }

    @Transactional
    public SaleDTO insert(SaleFormDTO dto) {
        Sale entity = new Sale();
        copyDtoToEntity(dto, entity);
        entity = saleRepository.save(entity);
        return new SaleDTO(entity);
    }

    @Transactional
    public SaleDTO update(Long id, SaleFormDTO dto) {
        Sale entity = saleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venda não encontrada: " + id));
        copyDtoToEntity(dto, entity);
        entity = saleRepository.save(entity);
        return new SaleDTO(entity);
    }

    @Transactional
    public void delete(Long id) {
        if (!saleRepository.existsById(id)) {
            throw new IllegalArgumentException("Venda não encontrada: " + id);
        }
        saleRepository.deleteById(id);
    }

    private void copyDtoToEntity(SaleFormDTO dto, Sale entity) {
        Seller seller = sellerRepository.findById(dto.getSellerId())
                .orElseThrow(() -> new IllegalArgumentException("Vendedor não encontrado: " + dto.getSellerId()));
        entity.setSeller(seller);
        entity.setVisited(dto.getVisited());
        entity.setDeals(dto.getDeals());
        entity.setAmount(dto.getAmount());
        entity.setDate(dto.getDate());
    }
}