import JWT from "../client/lib/jwt.js";
const {OctetFromClaims,Base64Claims,CreateJWT,Sign} = JWT;
const key = "big-secret"

const claim = {
	"file": "/resource/2018/06/11/asnd0912nnsnuc982.mp4"
};
const generatedToken = Sign("sha256", key, claim);
console.log(generatedToken)
