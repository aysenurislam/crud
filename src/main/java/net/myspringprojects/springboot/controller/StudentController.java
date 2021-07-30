package net.myspringprojects.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import net.myspringprojects.springboot.model.Student;
import net.myspringprojects.springboot.repository.StudentRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class StudentController {

	@Autowired
	private StudentRepository studentRepository;
	
	//get all students 
	
	@GetMapping("/students")
	public List<Student> getallStudents(){		
		return studentRepository.findAll();		
	}	

	//create student rest api
	@PostMapping("/students")
	public Student createStudent(@RequestBody Student student) {
		return studentRepository.save(student);
	}
	
	//update student rest api
	@PutMapping("/students/{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails){
		Optional<Student> optionalEntity =  studentRepository.findById(id);
		Student student = optionalEntity.get();
		
		student.setFirstName(studentDetails.getFirstName());
		student.setLastName(studentDetails.getLastName());
		student.setMobilePhoneNumber(studentDetails.getMobilePhoneNumber());
		student.setCity(studentDetails.getCity());
		student.setDistrict(studentDetails.getDistrict());
		student.setDescription(studentDetails.getDescription());
		
		Student updatedStudent=studentRepository.save(student);
		return ResponseEntity.ok(updatedStudent);
	}
	
	//delete student rest api
	@DeleteMapping("/students/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteStudent(@PathVariable Long id){
			Optional<Student> optionalEntity =  studentRepository.findById(id);
			Student student = optionalEntity.get();
			studentRepository.delete(student);
			Map<String, Boolean> response=new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
	}
	
}

