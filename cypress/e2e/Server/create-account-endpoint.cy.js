const server = "http://localhost:8080/api";
const client = "http://localhost:5173";

const opts = {
	method: "POST",
	credentials: "include",
	url: `${server}/create-account`,
	headers: { "Content-Type": "application/json", origin: client },
};

// test the /create-account endpoint
describe("/create-account endpoint", () => {
	let user, pass, email;

	beforeEach(() => {
		user = "TestUser";
		pass = "TestPass";
		email = "test_email@email.com";
	});

	it("should create an account with a correct POST request", () => {
		cy.request({
			...opts,
			body: JSON.stringify({ user, pass, email }),
		}).then((response) => {
			expect(response.status).to.eq(200);
		});
	});

	it("should return Invalid Username error if invalid username", () => {
		user = "TestUser!";
		cy.request({
			...opts,
			body: JSON.stringify({ user, pass, email }),
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.body.error).to.eq("Invalid Username");
		});
	});

	it("should return Invalid Password error if invalid password", () => {
		pass = "asd";
		cy.request({
			...opts,
			body: JSON.stringify({ user, pass, email }),
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.body.error).to.eq("Invalid Password");
		});
	});
	it("should return Invalid Email error if invalid email", () => {
		email = "test_email";
		cy.request({
			...opts,
			body: JSON.stringify({ user, pass, email }),
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.body.error).to.eq("Invalid Email");
		});
	});
	it("should return Username is already in use if user exists", () => {
		user = "joacopaz";
		cy.request({
			...opts,
			body: JSON.stringify({ user, pass, email }),
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.body.error).to.eq("Username is already in use");
		});
	});
});
