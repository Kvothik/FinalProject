package com.skilldistillery.giggity.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BookingTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Booking booking;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("GiggityPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		booking = em.find(Booking.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		booking = null;
	}

	@Test
	void test() {
		assertNotNull(booking);
	}
//	@Test
//	void test2() {
//		assertNotNull(booking.getSeller().getFirstName());
//	}
	@Test
	void test3() {
		assertNotNull(booking.getSellerReview());
	}
	@Test
	void test4() {
		assertNotNull(booking.getMessages());
	}
	@Test
	void test5() {
		assertNotNull(booking.getJob());
	}

}
