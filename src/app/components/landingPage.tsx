import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Quiropractico from './images/Quiropractico.jpg';
import './styles/styles.css'; // Import your stylesheet
import Logo from './images/logo.png';

const landingPage: React.FC= ({}) => {
  const loginPath = "/api/auth/signin";
  return ( 
    <div>
      <header>
        <section className="wrapper grid gap-8 justify-items-center items-center pb-12 md:grid-cols-2 md:py-24">
            <Image src={Quiropractico} alt= "Quiropractico" className="w-full max-w-lg md:order-1"/>
            <article className="text-center space-y-6 md:text-left md:space-y-8">
                <h1 className="text-4xl font-bold text-very-dark-blue md:text-5xl">MedX</h1>
                <p className="text-dark-grayish-blue">MedX: Transformando la Gestión Quiropráctica, Simplificando tu Éxito</p>
                <Link href={loginPath} className="button mx-auto shadow-xl shadow-bright-red/30 md:mx-0">Iniciar Sesión</Link>
            </article>
        </section>
      </header>
      <figure className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt= "" src="./images/bg-tablet-pattern.svg" className="absolute w-full -z-10 -top-24 -right-1/4 max-w-2xl"></img>
      </figure>
      <main>
        <section className="wrapper text-center py-24 grid gap-12 md:grid-cols-2 md:text-left">
            <article>
                <h2 className="text-3xl font-bold text-very-dark-blue mb-6 md:text-4xl">¿Por qué MedX es diferente?</h2>
                <p className="text-dark-grayish-blue">
                    MedX se destaca entre otros sistemas de gestión de clínicas quiroprácticas gracias a su interfaz intuitiva, la personalización para adaptarse a las necesidades específicas de cada clínica, altos estándares de seguridad y privacidad, y un enfoque centrado en la quiropraxia. Además, ofrece soporte técnico sólido y actualizaciones regulares para garantizar que las clínicas estén equipadas con una solución eficaz y actualizada para la gestión de citas, registros y consultas, simplificando así la experiencia tanto para los profesionales de la salud. </p>
            </article>
            <div className="grid gap-12">
                <article className="space-y-4 md:space-y-6">
                    <p className="bg-very-pale-red rounded-l-full font-bold flex items-center md:bg-transparent">
                        <span className="bg-bright-red text-white px-6 rounded-full py-2">
                            01
                        </span>
                        <span className="flex-1 p-2">
                            Registro y Gestión de Pacientes
                        </span>
                    </p>
                    <p className="text-dark-grayish-blue text-left">MedX permite un registro sencillo y seguro de pacientes. Nuestro personal puede acceder y gestionar la información de pacientes de manera eficiente.</p>
                </article>
                <article className="space-y-4 md:space-y-6">
                    <p className="bg-very-pale-red rounded-l-full font-bold flex items-center md:bg-transparent">
                        <span className="bg-bright-red text-white px-6 rounded-full py-2">
                            02
                        </span>
                        <span className="flex-1 p-2">
                            Gestión de Citas y Registros 
                        </span>
                    </p>
                    <p className="text-dark-grayish-blue text-left"> MedX ofrece flexibilidad en la gestión de citas y registros. Cambiar, dar de baja o modificar información es sencillo y se puede hacer con facilidad a través de nuestra plataforma.
                    </p>
                </article>
                <article className="space-y-4 md:space-y-6">
                    <p className="bg-very-pale-red rounded-l-full font-bold flex items-center md:bg-transparent">
                        <span className="bg-bright-red text-white px-6 rounded-full py-2">
                            03
                        </span>
                        <span className="flex-1 p-2">
                            Acceso a Historiales Médicos
                        </span>
                    </p>
                    <p className="text-dark-grayish-blue text-left">Mantener y acceder a historiales médicos es sencillo y seguro con MedX. Nuestra plataforma permite un acceso rápido a la información de salud de los pacientes cuando sea necesario.
                    </p>
                </article>
            </div>
        </section>
      </main>
      <footer className="bg-very-dark-blue py-6">
        <section className="wrapper grid gap-12 justify-items-center footer-area md:footer-area-md md:grid-cols-3 md:justify-items-stretch">
            <a href="#" className="[grid-area:logo]">
                <Image src={Logo} alt= "Quiropractico" className="w-32"/>
            </a>
            <p className="text-dark-grayish-blue text-center [grid-area:copy] md:text-right">Copyright MedX 2023. Todos los derechos reservados</p>
        </section>
      </footer>

    </div>


    );
};
// src\app\components\images
export default landingPage;
