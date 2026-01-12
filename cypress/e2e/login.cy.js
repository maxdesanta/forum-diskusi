/**
 * - Login spec:
 * - should display login page correctly
 * - should display alert when email and password are empty
 * - should display alert when password is wrong
 * - should display homepage when login information is correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    // Pastikan mengunjungi halaman login. 
    // Jika '/' otomatis me-redirect ke login, tidak masalah. 
    // Tapi jika login ada di path tertentu, gunakan cy.visit('/login')
    cy.visit('/login'); 
  });

  it('should display login page correctly', () => {
    // Menggunakan ID (#email) jauh lebih akurat daripada placeholder
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('button[type="submit"]').contains('Login').should('be.visible');
  });

  it('should display alert when email and password are empty', () => {
    // Klik tombol login tanpa mengisi apapun
    cy.get('button[type="submit"]').click();
    
    // Menangkap window alert dari browser
    cy.on('window:alert', (str) => {
      // Sesuaikan pesan ini dengan pesan error yang muncul dari API Anda
      expect(str).to.match(/is not allowed to be empty|required/);
    });
  });

  it('should display homepage when login information is correct', () => {
    // Mengisi data (Gunakan akun yang terdaftar di API Dicoding)
    cy.get('#email').type('max@example.com');
    cy.get('#password').type('maxdesanta12');
    cy.get('button[type="submit"]').click();

    // Verifikasi sukses:
    // 1. URL berubah ke root (/)
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    // 2. Pastikan elemen login (seperti form) sudah tidak ada
    cy.get('#email').should('not.exist');
  });
});