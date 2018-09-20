import JWT from "../../client/lib/jwt.js";

const {OctetFromClaims, Base64Claims, CreateJWT, Sign, Verify} = JWT;
const key = "big-secret"

describe('Encode token in accordance with rfc7519', () => {
	it('Generate octet', () => {
		const claims = '{"typ":"JWT",\r\n "alg":"HS256"}';
		const octet = OctetFromClaims(claims);
		expect(octet.toString("utf8")).toEqual([123, 34, 116, 121, 112, 34, 58, 34, 74, 87, 84, 34, 44, 13, 10, 32, 34, 97, 108, 103, 34, 58, 34, 72, 83, 50, 53, 54, 34, 125].toString("utf8"));
	});

	it("Base64urlencode octet claims", () => {
		const claims = '{"typ":"JWT",\r\n "alg":"HS256"}';
		const octet = OctetFromClaims(claims);
		const base64encoded = Base64Claims(octet);
		expect(base64encoded.toString("utf8")).toEqual("eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9")
	})

	it("Base64urlencode octet claims from rfc", () => {
		const claims = '{"iss":"joe",\r\n' +
			' "exp":1300819380,\r\n' +
			' "http://example.com/is_root":true}';
		const octet = OctetFromClaims(claims);
		const base64encoded = Base64Claims(octet);
		expect(base64encoded).toEqual("eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ")
	})

	it('Decodes the expireAt', () => {
		const claims = {
			"file": "/resource/2018/06/11/asnd0912nnsnuc982.mp4"
		};
		const generatedToken = Sign(key, claims, 2, "hours");
		const result = Verify(key, generatedToken);
		expect(typeof JSON.parse(result).exp).toBe("number");
	});

	it('Decodes the filename', () => {
		const claims = {
			"file": "/resource/2018/06/11/asnd0912nnsnuc982.mp4"
		};
		const generatedToken = Sign(key, claims, 2, "hours");
		const result = Verify(key, generatedToken);
		expect(JSON.parse(result).file).toEqual(claims.file);
	});

})