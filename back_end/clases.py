import conexion_db as conn
# -------------------------------------------------------------------
# Definimos la clase "Libro"
# -------------------------------------------------------------------
class Libro:
    def __init__(self, id_libro, isbn, titulo, autor, anioPubliacion, editorial, rating, cantidad, precio, url_img_l, url_img_m, url_img_s, stock):
        self.id_libro    = id_libro
        self.isbn        = isbn
        self.titulo      = titulo
        self.auto        = autor
        self.anio_Publi  = anioPubliacion
        self,editorial   = editorial
        self.rating      = rating
        self.cantidad    = cantidad
        self.precio      = precio
        self.stock       = stock
        self.url_img_l   = url_img_l
        self.url_img_m   = url_img_m
        self.url_img_s   = url_img_s

    def modificar(self, n_isbn, n_titulo, n_autor, n_anioPubliacion, n_editorial, n_rating, n_cantidad, n_precio, n_url_img_l, n_url_img_m, n_url_img_s, n_stock):
        self.isbn        = n_isbn
        self.titulo      = n_titulo
        self.auto        = n_autor
        self.anio_Publi  = n_anioPubliacion
        self,editorial   = n_editorial
        self.rating      = n_rating
        self.cantidad    = n_cantidad
        self.precio      = n_precio
        self.stock       = n_stock
        self.url_img_l   = n_url_img_l
        self.url_img_m   = n_url_img_m
        self.url_img_s   = n_url_img_s
# -------------------------------------------------------------------
# Definimos la clase "Usuario"
# -------------------------------------------------------------------
class Usuario(object):
    """docstring for Usuari"""
    def __init__(self, id_usuario, nombre,apellido, email, ciudad, domicilio, telefono):
        super(Usuario, self).__init__()
        self.id_usuario = id_usuario
        self.nombre     = nombre
        self.apellido   = apellido
        self.email      = email
        self.ciudad     = ciudad
        self.domicilio  = domicilio
        self.telefono   = telefono
    #
    def modificar_Usuario(n_nombre, n_apellido, n_email, n_ciudad, n_domicilio, n_telefono):
        self.nombre    = n_nombre
        self.apellido  = n_apellido
        self.email     = n_email
        self.ciudad    = n_ciudad
        self.domicilio = n_domicilio
        self.telefono  = n_telefono
        


# -------------------------------------------------------------------
# Definimos la clase "Inventario"
# -------------------------------------------------------------------
class Inventario:
    def __init__(self):
        self.conexion = conn.get_db_connection()
        self.cursor = self.conexion.cursor()

    def agregar_Libro(self, codigo, descripcion, cantidad, precio):
        Libro_existente = self.conn.consultar_Libro(codigo)
        if Libro_existente:
            return jsonify({'message': 'Ya existe un Libro con ese código.'}), 400

        nuevo_Libro = Libro(codigo, descripcion, cantidad, precio)
        self.cursor.execute("INSERT INTO Libros VALUES (?, ?, ?, ?)", (codigo, descripcion, cantidad, precio))
        self.conexion.commit()
        return jsonify({'message': 'Libro agregado correctamente.'}), 200

    def consultar_Libro(self, codigo):
        self.cursor.execute("SELECT * FROM Libros WHERE codigo = ?", (codigo,))
        row = self.cursor.fetchone()
        if row:
            codigo, descripcion, cantidad, precio = row
            return Libro(codigo, descripcion, cantidad, precio)
        return None

    def modificar_Libro(self, codigo, nueva_descripcion, nueva_cantidad, nuevo_precio):
        Libro = self.consultar_Libro(codigo)
        if Libro:
            Libro.modificar(nueva_descripcion, nueva_cantidad, nuevo_precio)
            self.cursor.execute("UPDATE Libros SET descripcion = ?, cantidad = ?, precio = ? WHERE codigo = ?",
                                (nueva_descripcion, nueva_cantidad, nuevo_precio, codigo))
            self.conexion.commit()
            return jsonify({'message': 'Libro modificado correctamente.'}), 200
        return jsonify({'message': 'Libro no encontrado.'}), 404

    def listar_Libros(self):
        self.cursor.execute("SELECT * FROM Libros")
        rows = self.cursor.fetchall()
        Libros = []
        for row in rows:
            codigo, descripcion, cantidad, precio = row
            Libro = {'codigo': codigo, 'descripcion': descripcion, 'cantidad': cantidad, 'precio': precio}
            Libros.append(Libro)
        return jsonify(Libros), 200

    def eliminar_Libro(self, codigo):
        self.cursor.execute("DELETE FROM Libros WHERE codigo = ?", (codigo,))
        if self.cursor.rowcount > 0:
            self.conexion.commit()
            return jsonify({'message': 'Libro eliminado correctamente.'}), 200
        return jsonify({'message': 'Libro no encontrado.'}), 404


# -------------------------------------------------------------------
# Definimos la clase "Carrito"
# -------------------------------------------------------------------
class Carrito:
    def __init__(self):
        self.conexion = conn.get_db_connection()
        self.cursor = self.conexion.cursor()
        self.items = []

    def agregar(self, codigo, cantidad, inventario):
        Libro = inventario.conn.consultar_Libro(codigo)
        if Libro is None:
            return jsonify({'message': 'El Libro no existe.'}), 404
        if Libro.cantidad < cantidad:
            return jsonify({'message': 'Cantidad en stock insuficiente.'}), 400

        for item in self.items:
            if item.codigo == codigo:
                item.cantidad += cantidad
                self.cursor.execute("UPDATE Libros SET cantidad = cantidad - ? WHERE codigo = ?",
                                    (cantidad, codigo))
                self.conexion.commit()
                return jsonify({'message': 'Libro agregado al carrito correctamente.'}), 200

        nuevo_item = Libro(codigo, Libro.descripcion, cantidad, Libro.precio)
        self.items.append(nuevo_item)
        self.cursor.execute("UPDATE Libros SET cantidad = cantidad - ? WHERE codigo = ?",
                            (cantidad, codigo))
        self.conexion.commit()
        return jsonify({'message': 'Libro agregado al carrito correctamente.'}), 200

    def quitar(self, codigo, cantidad, inventario):
        for item in self.items:
            if item.codigo == codigo:
                if cantidad > item.cantidad:
                    return jsonify({'message': 'Cantidad a quitar mayor a la cantidad en el carrito.'}), 400
                item.cantidad -= cantidad
                if item.cantidad == 0:
                    self.items.remove(item)
                self.cursor.execute("UPDATE Libros SET cantidad = cantidad + ? WHERE codigo = ?",
                                    (cantidad, codigo))
                self.conexion.commit()
                return jsonify({'message': 'Libro quitado del carrito correctamente.'}), 200

        return jsonify({'message': 'El Libro no se encuentra en el carrito.'}), 404

    def mostrar(self):
        Libros_carrito = []
        for item in self.items:
            Libro = {'codigo': item.codigo, 'descripcion': item.descripcion, 'cantidad': item.cantidad,
                        'precio': item.precio}
            Libros_carrito.append(Libro)
        return jsonify(Libros_carrito), 200
