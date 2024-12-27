package com.example.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Entity.Notes;
import com.example.Repository.NoteRepository;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/notes")
public class NotesController {
	

    @Autowired
    private NoteRepository noteRepository;
    
    @GetMapping
    public List<Notes> getALLNotes(){
    	return noteRepository.findAll();
    }
    
    @PostMapping
    public Notes addNote(@RequestBody Notes note) {
		return noteRepository.save(note);
    	
    }
    
    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteRepository.deleteById(id);
    }

}
