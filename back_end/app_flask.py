from flask import Flask,  jsonify, request
from flask_mysqldb import MySQL
#from flask_cors import CORS
from clases import Carrito, Inventario

from config import config



# -------------------------------------------------------------------
# Configuración y rutas de la API Flask
# -------------------------------------------------------------------

app = Flask(__name__)
'''
CORS(app)'''

# -------------------------------------------------------------------
# Conexion con la base de datos
# -------------------------------------------------------------------
conexion = MySQL(app)


carrito = Carrito()         # Instanciamos un carrito
inventario = Inventario()   # Instanciamos un inventario


#ruta para el login del administrador
@app.route('/login')
def login():
    try:
        return "OK"
    except Exception as e:
        raise "Error"
    pass




# Ruta para obtener los datos de un libro según su código
@app.route('/libros/<int:codigo>', methods=['GET'])
def obtener_libro(codigo):
    libro = inventario.consultar_libro(codigo)
    if libro:
        return jsonify({
            'codigo': libro.codigo,
            'descripcion': libro.descripcion,
            'cantidad': libro.cantidad,
            'precio': libro.precio
        }), 200
    return jsonify({'message': 'libro no encontrado.'}), 404

# Ruta para obtener la lista de libros del inventario
@app.route('/libros', methods=['GET'])
def obtener_libros():
    return inventario.listar_libros()

# Ruta para agregar un libro al inventario
@app.route('/libros', methods=['POST'])
def agregar_libro():
    codigo = request.json.get('codigo')
    descripcion = request.json.get('descripcion')
    cantidad = request.json.get('cantidad')
    precio = request.json.get('precio')
    return inventario.agregar_libro(codigo, descripcion, cantidad, precio)

# Ruta para modificar un libro del inventario
@app.route('/libros/<int:codigo>', methods=['PUT'])
def modificar_libro(codigo):
    nueva_descripcion = request.json.get('descripcion')
    nueva_cantidad = request.json.get('cantidad')
    nuevo_precio = request.json.get('precio')
    return inventario.modificar_libro(codigo, nueva_descripcion, nueva_cantidad, nuevo_precio)

# Ruta para eliminar un libro del inventario
@app.route('/libros/<int:codigo>', methods=['DELETE'])
def eliminar_libro(codigo):
    return inventario.eliminar_libro(codigo)

# Ruta para agregar un libro al carrito
@app.route('/carrito', methods=['POST'])
def agregar_carrito():
    codigo = request.json.get('codigo')
    cantidad = request.json.get('cantidad')
    inventario = Inventario()
    return carrito.agregar(codigo, cantidad, inventario)

# Ruta para quitar un libro del carrito
@app.route('/carrito', methods=['DELETE'])
def quitar_carrito():
    codigo = request.json.get('codigo')
    cantidad = request.json.get('cantidad')
    inventario = Inventario()
    return carrito.quitar(codigo, cantidad, inventario)

# Ruta para obtener el contenido del carrito
@app.route('/carrito', methods=['GET'])
def obtener_carrito():
    return carrito.mostrar()

# Ruta para obtener la lista de libros del inventario
@app.route('/')
def index():
    return 'API de Inventario'



# Finalmente, si estamos ejecutando este archivo, lanzamos app.
if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.run()