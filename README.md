Eco-Tech Solutions  
Protocolo Proof of Repair (PoR)

Eco-Tech Solutions es una plataforma de ingeniería circular diseñada para certificar y documentar la vida útil extendida de los dispositivos electrónicos mediante el Protocolo Proof of Repair (PoR). El sistema transforma cada reparación y cada compra de componentes recuperados en un certificado de impacto ambiental verificable, promoviendo la economía circular y la defensa del Right to Repair.

La plataforma permite generar certificados oficiales en formato PDF que incluyen el cálculo del CO₂ evitado, equivalencias reales expresadas en árboles salvados y días de energía LED, y una tabla de trazabilidad que detalla cada componente rescatado junto con su ahorro individual. Cada certificado incorpora un código QR único que permite validar su autenticidad dentro del nodo Eco-Tech.

El sistema es multiusuario y separa la información por correo electrónico, utilizando claves de almacenamiento local del tipo myDevices_user@mail.com. Además, cuenta con una lógica de migración automática que rescata datos de versiones anteriores. Si un usuario inicia sesión y no posee datos asociados, el sistema busca la clave antigua myDevices y migra la información a su cuenta personal sin pérdida de historial.

Eco-Tech incluye un marketplace de componentes circulares donde los usuarios pueden adquirir piezas recuperadas. El sistema calcula dinámicamente la huella de carbono de cada compra y la integra al certificado final. El flujo completo conecta compra, impacto ambiental y certificación legal de economía circular.

La estructura del proyecto está organizada de la siguiente forma:

ECO-TECH-POR/  
src/  
components/  
ImpactCertificate.jsx – Generador de PDF y tabla de impacto  
UserDashboard.jsx – Panel de usuario con migración de datos  
RepairForm.jsx – Registro técnico de equipos  
CartView.jsx – Carrito y lógica de pedidos  
Marketplace.jsx – Tienda circular  
ProductDetail.jsx – Detalle técnico y trazabilidad PoR  
App.jsx – Enrutador y estado global  
main.jsx – Punto de entrada de React  
package.json – Dependencias del proyecto  
README.md – Documentación oficial  

Actualmente, el sistema utiliza LocalStorage como base de datos para permitir una ejecución inmediata sin servidor. Las claves principales son myDevices_email para los equipos reparados por usuario, myOrders para el historial de compras, userRole para la gestión de permisos entre técnico y cliente, y userEmail para identificar la sesión activa. La lógica de migración se ejecuta automáticamente al detectar la ausencia de datos en la cuenta actual.

Para instalar las librerías críticas necesarias para la generación de certificados, QR y navegación, se debe ejecutar el comando npm install jspdf html2canvas qrcode.react lucide-react react-router-dom. Para iniciar el entorno de desarrollo, se utiliza npm run dev.

Desde la perspectiva del usuario o cliente, el flujo consiste en comprar componentes desde el marketplace, donde el sistema suma el CO₂ evitado de cada pieza. Al finalizar, el usuario puede acceder a la opción Ver Certificado, visualizar las equivalencias ambientales y la tabla detallada de componentes, y descargar el PDF como documento legal de economía circular. Para el técnico, el sistema permite registrar equipos reparados, generando un identificador único PoR que puede ser validado posteriormente mediante QR.

Las fórmulas de impacto ambiental utilizadas son: el CO₂ total evitado corresponde a la suma de la huella de fabricación de cada componente recuperado. La equivalencia forestal se basa en que un árbol absorbe 20 kg de CO₂ por año, mientras que la equivalencia energética considera que un día de energía LED equivale a 0.15 kg de CO₂.

El estado global de la aplicación fue reestructurado en App.jsx para garantizar que todos los componentes tengan acceso al inventario completo de piezas recuperadas. Se integraron cuatro productos principales —pantalla, batería, teclado y placa base— con sus respectivos metadatos de trazabilidad. Se corrigieron inconsistencias que limitaban el reconocimiento del catálogo completo, asegurando un flujo de compra y visualización estable.

El marketplace fue optimizado para mantener una interfaz limpia y profesional, incorporando una lógica anti-duplicados que combina productos internos y externos mediante la comparación de IDs únicos. Se preservó el diseño de las tarjetas de producto y el sistema de filtros por categorías.

En ProductDetail.jsx se resolvió el error crítico de “Producto no encontrado” que afectaba a componentes con IDs superiores a dos. Se normalizó la comparación de identificadores utilizando strings para evitar conflictos entre enteros y valores provenientes de la URL. Además, se activó la visualización completa de la trazabilidad PoR, mostrando el recorrido técnico de cada pieza desde su origen.

Cada componente del sistema cuenta con datos de impacto ecológico expresados en kilogramos de CO₂, trazabilidad Proof of Repair con nodo de origen, ID del técnico certificado y pasos de verificación, así como una garantía técnica con estado PoR activo.

El desarrollo utiliza React JS con hooks como useState, useEffect y useParams, React Router DOM para la navegación dinámica, Lucide-React para la iconografía técnica y Git para el control de versiones. Se creó la rama PoRV2.0 para aislar las nuevas funcionalidades, manteniendo la rama main como versión estable y sincronizada con el repositorio remoto.

El estado actual de la plataforma es completamente funcional, con navegación estable, filtrado correcto, visualización detallada de componentes, marketplace operativo y certificados PDF verificables para todo el inventario.

Eco-Tech Solutions 2026  
Defending the Right to Repair
