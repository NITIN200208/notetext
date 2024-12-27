package com.example.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Entity.Notes;

@Repository
public interface NoteRepository extends JpaRepository<Notes, Long> {

}
