'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  const [cursos, setCursos] = useState([]);
  const [estudiantesNotas, setEstudiantesNotas] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState({
    nombre: 'Ana García',
    especialidad: 'Ingeniería de Software',
    correo: 'ana.garcia@example.edu.pe',
    dni: '12345678'
  });
  const router = useRouter();

  // Simulación de datos (en una aplicación real, estos vendrían de tu API)
  useEffect(() => {
    // Datos de ejemplo para los cursos del profesor
    setCursos([
      { id: 1, codigo: 'PW101', nombre: 'Programación Web', carrera: 'Ing. Software', ciclo: 'V', estudiantes: 25, horario: 'Lunes y Miércoles 8:00-10:00' },
      { id: 2, codigo: 'BD201', nombre: 'Base de Datos', carrera: 'Ing. Software', ciclo: 'IV', estudiantes: 30, horario: 'Martes y Jueves 10:00-12:00' },
      { id: 3, codigo: 'ALG301', nombre: 'Algoritmos', carrera: 'Ciencia de Datos', ciclo: 'III', estudiantes: 20, horario: 'Viernes 14:00-18:00' },
    ]);

    // Datos de ejemplo para estudiantes y notas (de un curso específico)
    setEstudiantesNotas([
      { id: 1, nombre: 'Juan Pérez', dni: '87654321', practica: 16, teoria: 14, ponderacion: 15, estado: 'A' },
      { id: 2, nombre: 'María López', dni: '76543218', practica: 18, teoria: 12, ponderacion: 14, estado: 'A' },
      { id: 3, nombre: 'Carlos Ramírez', dni: '65432187', practica: 10, teoria: 8, ponderacion: 9, estado: 'D' },
      { id: 4, nombre: 'Luisa Fernández', dni: '54321876', practica: 15, teoria: 17, ponderacion: 16, estado: 'A' },
    ]);

    // Datos de ejemplo para registros de asistencia
    setAsistencias([
      { id: 1, fecha: '2023-05-15', curso: 'Programación Web', presentes: 22, ausentes: 3, total: 25 },
      { id: 2, fecha: '2023-05-16', curso: 'Base de Datos', presentes: 28, ausentes: 2, total: 30 },
      { id: 3, fecha: '2023-05-17', curso: 'Algoritmos', presentes: 18, ausentes: 2, total: 20 },
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
            {/* Resumen de cursos */}
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Mis Cursos</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrera</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciclo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiantes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cursos.map((curso) => (
                      <tr key={curso.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{curso.codigo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{curso.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curso.carrera}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curso.ciclo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curso.estudiantes}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curso.horario}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => setActiveTab('notas')}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Notas
                          </button>
                          <button 
                            onClick={() => setActiveTab('asistencias')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Asistencia
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Últimos registros de asistencia */}
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Últimas Asistencias</h3>
              <div className="space-y-4">
                {asistencias.slice(0, 3).map((asistencia) => (
                  <div key={asistencia.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{asistencia.curso}</h4>
                        <p className="text-sm text-gray-500 mt-1">{new Date(asistencia.fecha).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-green-600">{asistencia.presentes} presentes</span>
                        <span className="block text-xs font-medium text-red-600">{asistencia.ausentes} ausentes</span>
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(asistencia.presentes / asistencia.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setActiveTab('asistencias')}
                className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Ver todos los registros →
              </button>
            </div>

            {/* Estadísticas rápidas */}
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">Total Cursos</p>
                  <p className="text-2xl font-bold text-blue-600">{cursos.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">Estudiantes</p>
                  <p className="text-2xl font-bold text-green-600">{cursos.reduce((acc, curso) => acc + curso.estudiantes, 0)}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">Horas semanales</p>
                  <p className="text-2xl font-bold text-purple-600">12</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">Créditos</p>
                  <p className="text-2xl font-bold text-yellow-600">24</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'notas':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Registro de Notas</h2>
              <select className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Programación Web - Ciclo V</option>
                <option>Base de Datos - Ciclo IV</option>
                <option>Algoritmos - Ciclo III</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Práctica</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ponderación</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {estudiantesNotas.map((estudiante) => (
                    <tr key={estudiante.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{estudiante.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estudiante.dni}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="number" 
                          defaultValue={estudiante.practica} 
                          className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="number" 
                          defaultValue={estudiante.teoria} 
                          className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {estudiante.ponderacion.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${estudiante.estado === 'A' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {estudiante.estado === 'A' ? 'Aprobado' : 'Desaprobado'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">Guardar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-sm font-medium">
                Exportar a Excel
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium">
                Guardar todos los cambios
              </button>
            </div>
          </div>
        );
      case 'asistencias':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Registro de Asistencias</h2>
              <div className="flex space-x-3">
                <select className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Programación Web - Ciclo V</option>
                  <option>Base de Datos - Ciclo IV</option>
                  <option>Algoritmos - Ciclo III</option>
                </select>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium">
                  Nueva asistencia
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presentes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ausentes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Porcentaje</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {asistencias.map((asistencia) => (
                    <tr key={asistencia.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(asistencia.fecha).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asistencia.curso}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{asistencia.presentes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{asistencia.ausentes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asistencia.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {((asistencia.presentes / asistencia.total) * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                        <button className="text-red-600 hover:text-red-900">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-sm font-medium">
                Exportar a Excel
              </button>
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
                    <label className="block text-sm font-medium text-gray-700">Nombres Completos</label>
                    <p className="mt-1 text-sm text-gray-900">{teacherInfo.nombre}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">DNI</label>
                    <p className="mt-1 text-sm text-gray-900">{teacherInfo.dni}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <p className="mt-1 text-sm text-gray-900">{teacherInfo.correo}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Información Profesional</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Especialidad</label>
                    <p className="mt-1 text-sm text-gray-900">{teacherInfo.especialidad}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Años de experiencia</label>
                    <input 
                      type="number" 
                      defaultValue="5" 
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
                    Actualizar Perfil
                  </button>
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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img className="h-10 w-auto" src="/logo.png" alt="Logo SEVA" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Sistema SEVA - Profesor</h1>
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
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src="/avatar-profesor.png" alt="Avatar" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{teacherInfo.nombre}</h2>
                  <p className="text-sm text-gray-500">{teacherInfo.especialidad}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {teacherInfo.correo}
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
                      Registro de Notas
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
                      Control de Asistencias
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
              <h2 className="text-2xl font-bold mb-2">¡Bienvenido, Prof. {teacherInfo.nombre.split(' ')[0]}!</h2>
              <p className="opacity-90">Gestiona tus cursos, registra notas y asistencias desde tu panel.</p>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;