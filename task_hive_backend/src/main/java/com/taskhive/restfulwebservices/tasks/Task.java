package com.taskhive.restfulwebservices.tasks;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Task {

	@Id
	@GeneratedValue
	private Integer id;
	private String username;
	private String description;
	private LocalDate targetDate;
	private boolean completed;

	public Task() {
		
	}
	
	public Task(Integer id, String username, String description, LocalDate targetDate, boolean completed) {
		super();
		this.id = id;
		this.username = username;
		this.description = description;
		this.targetDate = targetDate;
		this.completed = completed;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDate getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(LocalDate targetDate) {
		this.targetDate = targetDate;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "Task{" +
				"completed=" + completed +
				", id=" + id +
				", username='" + username + '\'' +
				", description='" + description + '\'' +
				", targetDate=" + targetDate +
				'}';
	}
}