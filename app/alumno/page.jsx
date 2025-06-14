'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  const [notas, setNotas] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    nombre: 'Juan Pérez',
    carrera: 'Ingeniería de Software',
    ciclo: '5',
    dni: '87654321',
    correo: 'juan.perez@example.edu.pe'
  });
  const router = useRouter();

  // Simulación de datos (en una aplicación real, estos vendrían de tu API)
  useEffect(() => {
    // Datos de ejemplo para las notas
    setNotas([
      { id: 1, curso: 'Programación Web', practica: 16, teoria: 14, ponderacion: 15, estado: 'A' },
      { id: 2, curso: 'Base de Datos', practica: 18, teoria: 12, ponderacion: 14, estado: 'A' },
      { id: 3, curso: 'Algoritmos', practica: 15, teoria: 17, ponderacion: 16, estado: 'A' },
    ]);

    // Datos de ejemplo para asistencias
    setAsistencias([
      { id: 1, curso: 'Programación Web', fecha: '2023-05-15', estado: 'P' },
      { id: 2, curso: 'Base de Datos', fecha: '2023-05-16', estado: 'F' },
      { id: 3, curso: 'Algoritmos', fecha: '2023-05-17', estado: 'P' },
    ]);

    // Datos de ejemplo para cursos matriculados
    setCursos([
      { id: 1, nombre: 'Programación Web', profesor: 'Ana García', creditos: 4, horario: 'Lunes y Miércoles 8:00-10:00' },
      { id: 2, nombre: 'Base de Datos', profesor: 'Carlos López', creditos: 3, horario: 'Martes y Jueves 10:00-12:00' },
      { id: 3, nombre: 'Algoritmos', profesor: 'Luisa Fernández', creditos: 4, horario: 'Viernes 14:00-18:00' },
    ]);

    // Datos de ejemplo para pagos
    setPagos([
      { id: 1, fecha: '2023-03-15', monto: 1200, estado: 'Pagado' },
      { id: 2, fecha: '2023-04-10', monto: 800, estado: 'Pagado' },
      { id: 3, fecha: '2023-05-05', monto: 1000, estado: 'Pendiente' },
    ]);
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    router.push('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Resumen de notas */}
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Notas</h3>
              <div className="space-y-3">
                {notas.map((nota) => (
                  <div key={nota.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">{nota.curso}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${nota.estado === 'A' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {nota.ponderacion.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="#notas" onClick={() => setActiveTab('notas')} className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver todas las notas →
              </Link>
            </div>

            {/* Asistencias recientes */}
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Asistencias Recientes</h3>
              <div className="space-y-3">
                {asistencias.slice(0, 3).map((asistencia) => (
                  <div key={asistencia.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{asistencia.curso}</span>
                      <span className="block text-xs text-gray-500">{new Date(asistencia.fecha).toLocaleDateString()}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${asistencia.estado === 'P' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {asistencia.estado === 'P' ? 'Presente' : 'Falta'}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="#asistencias" onClick={() => setActiveTab('asistencias')} className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver todas las asistencias →
              </Link>
            </div>

            {/* Cursos matriculados */}
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Cursos Matriculados</h3>
              <div className="space-y-4">
                {cursos.map((curso) => (
                  <div key={curso.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-medium text-gray-800">{curso.nombre}</h4>
                    <p className="text-sm text-gray-600 mt-1">Profesor: {curso.profesor}</p>
                    <div className="flex justify-between mt-2 text-xs">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Créditos: {curso.creditos}</span>
                      <span className="text-gray-500">{curso.horario}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estado de pagos */}
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Estado de Pagos</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pagos.map((pago) => (
                      <tr key={pago.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(pago.fecha).toLocaleDateString()}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">S/ {pago.monto.toFixed(2)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${pago.estado === 'Pagado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {pago.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="#pagos" onClick={() => setActiveTab('pagos')} className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver historial completo →
              </Link>
            </div>
          </div>
        );
      case 'notas':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis Notas</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Práctica</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ponderación</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notas.map((nota) => (
                    <tr key={nota.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{nota.curso}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nota.practica.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nota.teoria.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{nota.ponderacion.toFixed(1)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${nota.estado === 'A' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {nota.estado === 'A' ? 'Aprobado' : 'Desaprobado'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'asistencias':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis Asistencias</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {asistencias.map((asistencia) => (
                    <tr key={asistencia.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asistencia.curso}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(asistencia.fecha).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${asistencia.estado === 'P' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {asistencia.estado === 'P' ? 'Presente' : 'Falta'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'cursos':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis Cursos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursos.map((curso) => (
                <div key={curso.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-5 bg-white">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{curso.nombre}</h3>
                    <p className="text-sm text-gray-600 mb-3">Profesor: {curso.profesor}</p>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Créditos: {curso.creditos}</span>
                      <span className="text-gray-500">{curso.horario}</span>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
                      Ver detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'pagos':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis Pagos</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pagos.map((pago) => (
                    <tr key={pago.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(pago.fecha).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">S/ {pago.monto.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${pago.estado === 'Pagado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {pago.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Ver recibo</button>
                        {pago.estado === 'Pendiente' && (
                          <button className="text-green-600 hover:text-green-900">Pagar ahora</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'perfil':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mi Perfil</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Información Personal</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 font-bold">Nombres Completos</label>
                    <p className="mt-1 text-sm text-gray-900">{studentInfo.nombre}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-bold">DNI</label>
                    <p className="mt-1 text-sm text-gray-900">{studentInfo.dni}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-bold">Correo Electrónico</label>
                    <p className="mt-1 text-sm text-gray-900">{studentInfo.correo}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Información Académica</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 font-bold">Carrera</label>
                    <p className="mt-1 text-sm text-gray-900">{studentInfo.carrera}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-bold">Ciclo Actual</label>
                    <p className="mt-1 text-sm text-gray-900">{studentInfo.ciclo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img className="h-10 w-auto" src="/logo.png" alt="Logo SEVA" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Sistema SEVA - Estudiante</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">Notificaciones</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-12 w-12 rounded-full"
                  >
                    <circle cx="24" cy="24" r="24" fill="#e0e7ef" />
                    <circle cx="24" cy="18" r="9" fill="#90caf9" />
                    <ellipse cx="24" cy="36" rx="13" ry="8" fill="#64b5f6" />
                    <ellipse cx="24" cy="36" rx="10" ry="6" fill="#bbdefb" />
                    <circle cx="24" cy="20" r="7" fill="#fff" />
                    <ellipse cx="24" cy="34" rx="8" ry="5" fill="#fff" />
                    <circle cx="24" cy="20" r="6" fill="#fbc02d" />
                    <ellipse cx="24" cy="34" rx="7" ry="4" fill="#ffe082" />
                    <ellipse cx="24" cy="19" rx="3" ry="4" fill="#fffde7" opacity="0.5" />
                    <ellipse cx="20" cy="18" rx="1.2" ry="2" fill="#fff" opacity="0.7" />
                    <ellipse cx="28" cy="18" rx="1.2" ry="2" fill="#fff" opacity="0.7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{studentInfo.nombre}</h2>
                  <p className="text-sm text-gray-500">{studentInfo.carrera}</p>
                </div>
              </div>
              <div className="flex border-t border-gray-200 pt-4 items-center">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Ciclo: {studentInfo.ciclo}
                </p>
              </div>
            </div>

            <nav className="bg-white rounded-lg shadow-md p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('inicio')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'inicio' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Inicio
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('notas')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'notas' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Mis Notas
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('asistencias')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'asistencias' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Asistencias
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('cursos')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'cursos' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Cursos
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('pagos')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'pagos' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pagos
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('perfil')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'perfil' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi Perfil
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md p-6 mb-6 text-white">
              <h2 className="text-2xl font-bold mb-2">¡Bienvenido, {studentInfo.nombre.split(' ')[0]}!</h2>
              <p className="opacity-90">Revisa tus notas, asistencias y más en tu panel de estudiante.</p>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;