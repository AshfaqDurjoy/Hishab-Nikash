use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Models\User;

public function register(Request $request)
{
    try {
        $v = Validator::make($request->all(), [
            'full_name' => 'required|string|max:100',
            'email'     => 'required|string|email|max:255|unique:users,email',
            'password'  => 'required|string|min:6',
        ]);
        if ($v->fails()) return response()->json(['ok'=>false,'error'=>$v->errors()->first()], 400);

        $user = User::create([
            'name'     => $request->input('full_name'), // map to 'name'
            'email'    => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        return response()->json(['ok'=>true,'user'=>[
            'id'=>$user->id,'email'=>$user->email,'full_name'=>$user->name
        ]], 201);
    } catch (\Throwable $e) {
        Log::error('Register failed', ['e'=>$e]);
        return response()->json(['ok'=>false,'error'=>'Server error'], 500);
    }
}

public function login(Request $request)
{
    try {
        $v = Validator::make($request->all(), [
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($v->fails()) return response()->json(['ok'=>false,'error'=>$v->errors()->first()], 400);

        $user = User::where('email', $request->input('email'))->first();
        if (!$user || !Hash::check($request->input('password'), $user->password)) {
            return response()->json(['ok'=>false,'error'=>'Invalid credentials'], 401);
        }

        $token = base64_encode(Str::random(40)); // demo token

        return response()->json(['ok'=>true,'token'=>$token,'user'=>[
            'id'=>$user->id,'email'=>$user->email,'full_name'=>$user->name
        ]]);
    } catch (\Throwable $e) {
        Log::error('Login failed', ['e'=>$e]);
        return response()->json(['ok'=>false,'error'=>'Server error'], 500);
    }
}
