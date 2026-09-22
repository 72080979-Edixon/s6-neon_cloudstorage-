import { sql } from './neon-config.js';

export async function registrarUsuario(nombre, correo, contrasena) {
  await sql`INSERT INTO usuarios (nombre, correo, contrasena) VALUES (${nombre}, ${correo}, ${contrasena})`;
}

export async function iniciarSesion(correo, contrasena) {
  const filas = await sql`SELECT id, nombre FROM usuarios WHERE correo = ${correo} AND contrasena = ${contrasena}`;
  if (filas.length === 0) return null;
  sessionStorage.setItem('usuario', JSON.stringify(filas[0]));
  return filas[0];
}

export function cerrarSesion() {
  sessionStorage.removeItem('usuario');
}

// Listener para crear cuenta
document.getElementById("formRegistro").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  await registrarUsuario(nombre, correo, contrasena);
  const mensaje = document.getElementById("mensaje-registro");
  mensaje.textContent = "Cuenta creada correctamente.";
  mensaje.classList.add("mostrar");
});

// Listener para iniciar sesión
document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  const correo = document.getElementById("correoLogin").value;
  const contrasena = document.getElementById("contrasenaLogin").value;
  const usuario = await iniciarSesion(correo, contrasena);
  const mensaje = document.getElementById("mensaje-registro");
  if (usuario) {
    mensaje.textContent = `Bienvenido, ${usuario.nombre}`;
    mensaje.classList.add("mostrar");
    window.location.href = "catalogo.html"; // redirige al catálogo
  } else {
    mensaje.textContent = "Correo o contraseña incorrectos.";
    mensaje.classList.add("mostrar");
  }
});