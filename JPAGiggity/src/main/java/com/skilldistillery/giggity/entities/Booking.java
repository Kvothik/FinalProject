package com.skilldistillery.giggity.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Booking {

	// F I E L D S
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "start_date")
	private LocalDate startDate;

	@Column(name = "complete_date")
	private LocalDate completeDate;

	@Column(name = "expected_complete_date")
	private LocalDate expectedCompleteDate;

	private String notes;

	private boolean accepted;
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "seller_id")
	private User seller;
	
	@JsonIgnore
	@OneToMany(mappedBy = "booking")
	private List<SellerReview> sellerReviews;

	@OneToMany(mappedBy = "booking")
	private List<BookingMessage> messages;

	@ManyToOne
	@JoinColumn(name = "job_id")
	private Job job;

	// C O N S T R U C T O R
	public Booking() {

	}

	// G E T T E R S && S E T T E R S

	public int getId() {
		return id;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public List<BookingMessage> getMessages() {
		return messages;
	}

	public void setMessages(List<BookingMessage> messages) {
		this.messages = messages;
	}

	public List<SellerReview> getSellerReviews() {
		return sellerReviews;
	}

	public void setSellerReviews(List<SellerReview> sellerReviews) {
		this.sellerReviews = sellerReviews;
	}

	public User getSeller() {
		return seller;
	}

	public void setSeller(User seller) {
		this.seller = seller;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getCompleteDate() {
		return completeDate;
	}

	public void setCompleteDate(LocalDate completeDate) {
		this.completeDate = completeDate;
	}

	public LocalDate getExpectedCompleteDate() {
		return expectedCompleteDate;
	}

	public void setExpectedCompleteDate(LocalDate expectedCompleteDate) {
		this.expectedCompleteDate = expectedCompleteDate;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public boolean isAccepted() {
		return accepted;
	}

	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}

	// H A S H && E Q U A L S
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (accepted ? 1231 : 1237);
		result = prime * result + ((completeDate == null) ? 0 : completeDate.hashCode());
		result = prime * result + ((expectedCompleteDate == null) ? 0 : expectedCompleteDate.hashCode());
		result = prime * result + id;
		result = prime * result + ((notes == null) ? 0 : notes.hashCode());
		result = prime * result + ((startDate == null) ? 0 : startDate.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Booking other = (Booking) obj;
		if (accepted != other.accepted)
			return false;
		if (completeDate == null) {
			if (other.completeDate != null)
				return false;
		} else if (!completeDate.equals(other.completeDate))
			return false;
		if (expectedCompleteDate == null) {
			if (other.expectedCompleteDate != null)
				return false;
		} else if (!expectedCompleteDate.equals(other.expectedCompleteDate))
			return false;
		if (id != other.id)
			return false;
		if (notes == null) {
			if (other.notes != null)
				return false;
		} else if (!notes.equals(other.notes))
			return false;
		if (startDate == null) {
			if (other.startDate != null)
				return false;
		} else if (!startDate.equals(other.startDate))
			return false;
		return true;
	}

	// T O S T R I N G
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Booking [id=");
		builder.append(id);
		builder.append(", startDate=");
		builder.append(startDate);
		builder.append(", completeDate=");
		builder.append(completeDate);
		builder.append(", expectedCompleteDate=");
		builder.append(expectedCompleteDate);
		builder.append(", notes=");
		builder.append(notes);
		builder.append(", accepted=");
		builder.append(accepted);
		builder.append("]");
		return builder.toString();
	}

}
