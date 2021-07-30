package net.myspringprojects.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.myspringprojects.springboot.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long>{

}
