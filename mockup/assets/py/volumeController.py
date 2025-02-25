from ctypes import cast, POINTER
from comtypes import CLSCTX_ALL, CoInitialize
from pycaw.pycaw import IAudioEndpointVolume
from pycaw.utils import AudioUtilities
from http.server import SimpleHTTPRequestHandler, HTTPServer
import urllib.parse

CoInitialize()  # Inicializar COM para evitar errores

# Función para obtener el volumen del sistema
def get_volume():
    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))
    return int(volume.GetMasterVolumeLevelScalar() * 100)  # Convertir de 0-1 a 0-100

# Función para establecer el volumen
def set_volume(level):
    level = int(level) / 100.0  # Convertir de 0-100 a 0-1
    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))
    volume.SetMasterVolumeLevelScalar(level, None)

# Servidor HTTP
class VolumeHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        query = urllib.parse.parse_qs(parsed_path.query)

        if parsed_path.path == "/get_volume":
            volume = get_volume()
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")  # Permitir CORS
            self.end_headers()
            self.wfile.write(str(volume).encode())

        elif parsed_path.path == "/set_volume" and "level" in query:
            set_volume(query["level"][0])
            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")  # Permitir CORS
            self.end_headers()
            self.wfile.write(b"Volume updated")

        else:
            self.send_response(404)
            self.end_headers()

# Iniciar servidor
server = HTTPServer(("localhost", 8000), VolumeHandler)
print("Server running on http://localhost:8000")
server.serve_forever()
