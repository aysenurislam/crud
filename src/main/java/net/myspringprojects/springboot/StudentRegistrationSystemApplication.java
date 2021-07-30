package net.myspringprojects.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import net.myspringprojects.springboot.model.Student;
import net.myspringprojects.springboot.repository.StudentRepository;

@SpringBootApplication
public class StudentRegistrationSystemApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(StudentRegistrationSystemApplication.class, args);
	}

	@Autowired
	private StudentRepository studentRepository;


	@Override
	public void run(String... args) throws Exception {

	}

}