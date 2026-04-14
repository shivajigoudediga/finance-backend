package com.finance.service;

import com.finance.model.FinanceRecord;
import com.finance.repository.FinanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FinanceService {

    @Autowired
    private FinanceRepository repo;

    public List<FinanceRecord> getAll(String sort) {
        return switch (sort == null ? "" : sort) {
            case "amount,desc" -> repo.findAllByOrderByAmountDesc();
            case "date,desc"   -> repo.findAllByOrderByDateDesc();
            case "userName"    -> repo.findAllByOrderByUserNameAsc();
            default            -> repo.findAll();
        };
    }

    public Optional<FinanceRecord> getById(Long id) {
        return repo.findById(id);
    }

    public FinanceRecord create(FinanceRecord r) {
        return repo.save(r);
    }

    public FinanceRecord update(Long id, FinanceRecord updated) {
        updated.setId(id);
        return repo.save(updated);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
