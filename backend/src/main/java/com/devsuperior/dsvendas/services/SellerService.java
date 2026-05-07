package com.devsuperior.dsvendas.services;

import com.devsuperior.dsvendas.dto.SellerDTO;
import com.devsuperior.dsvendas.dto.SellerFormDTO;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.repositories.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    @Transactional(readOnly = true)
    public List<SellerDTO> findAll() {
        List<Seller> result = sellerRepository.findAll();
        return result.stream().map(SellerDTO::new).collect(Collectors.toList());
    }

    @Transactional
    public SellerDTO insert(SellerFormDTO dto) {
        Seller entity = new Seller();
        entity.setName(dto.getName());
        entity = sellerRepository.save(entity);
        return new SellerDTO(entity);
    }

    @Transactional
    public SellerDTO update(Long id, SellerFormDTO dto) {
        Seller entity = sellerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vendedor não encontrado: " + id));
        entity.setName(dto.getName());
        entity = sellerRepository.save(entity);
        return new SellerDTO(entity);
    }

    @Transactional
    public void delete(Long id) {
        if (!sellerRepository.existsById(id)) {
            throw new IllegalArgumentException("Vendedor não encontrado: " + id);
        }
        sellerRepository.deleteById(id);
    }
}
