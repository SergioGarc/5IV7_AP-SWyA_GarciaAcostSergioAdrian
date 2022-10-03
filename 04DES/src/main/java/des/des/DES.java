package des.des;

/**
 *
 *Vamos a cifrar DES del siguiente modo:
 * 
 * Modo de bloques de 64 bits 
 * Manejamos una private key de 64 bits
 * Vamos a inicializar la llave privada a 56 bits
 * 
 * Las permutaciones y las cajas nde sustitucion se van a crear desde la instancia del algoritmo descifrado
 * para ello vamos a ocupar las librerias de crypto y security 
 */

import java.security.*;

// para jenerar las llaves
import javax.crypto.spec.*;

import javax.crypto.*;

import java.io.*;
import java.util.Locale;

public class DES {
    
    public static void main(String[] args) throws Exception
    {
        // Vamos a cargar un archivo que vamos a cifrar 
        if(args.length != 1)
        {
            // No hay archivo
            mensajeAyuda();
            System.exit(1);
        }
        // Lo primero que tenemos que hacer es cargar una instancia del proedopr del algoritmo del tipo de cifrado por parte de las librerias
        System.out.println("1.- Generar la clave DES");
        
        // Para las llaves ocupamos spec key generator 
        KeyGenerator generadorDES = KeyGenerator.getInstance("DES");
               
          //inicializamos el tamaño de la llave privada
          generadorDES.init(56);
          
          //Vamos a generar las subclaves
          SecretKey clave = generadorDES.generateKey();
          //Se generan las 16 subclaves
          
          System.out.println("la llave es: " + clave);
          
          //No tiene formato, se tiene que codificar
          mostrarBytes(clave.getEncoded());
          
          System.out.println("");
          
          /*
          El cifrado debe de venir acompañado de uno o varios de los estandares de criptografia tales como los que vimos en la sesion de PKCS
          
          Una instancia DES despues la configuracion de el tipo de cifrado si es bloque o flujo, asi como tambien se aplica o no relleno
          
          ALGORITMO DES 
          MODO ECB(ELECTRONIC CODE BOOK)
          PKCS 5 RELLENO
          */    
          
          Cipher cifrador = Cipher.getInstance("DES/ECB/PKCS5Padding");
          
          System.out.println("2.- Cifrar con DES el archivo:" + args[0] + ", dejarel resultado en:" + args[0] + ".cifrado");
          
          //cifrado
          cifrador.init(Cipher.ENCRYPT_MODE, clave);
          
          //el problema esla lectura de los bloques
          //El problema es la entrada o salida de los bloques del archivo
          
          byte[] buffer = new byte [1000];
          byte[] bufferCifrado;
          //generar los archivos
          FileInputStream in = new FileInputStream(args[0]);
          FileOutputStream out = new FileOutputStream(args[0] +".cifrado");
          
          //lectura
          int bytesleidos = in.read(buffer, 0, 1000);
          while(bytesleidos != -1){
              //pasar al texto claro a cifrado
              bufferCifrado = cifrador.update(buffer, 0, bytesleidos);
              
             //generamos la salida
             out.write(bufferCifrado);
             bytesleidos = in.read(buffer, 0, 1000);
          }
          //vamos a reunir los pedazos
          bufferCifrado = cifrador.doFinal();
          //ya escribo la salida
          out.write(bufferCifrado);
          
          in.close();
          out.close();
              //decifrar
              System.out.println("3.-Descifrarcon DES el archivo :"
              +args[0] + "Cifrado" + ", vamos a ver el resultadoen el" + "archivo :" + args[0] + ".descifrado");
              
              //empezamosconelmodo de decifrado
              cifrador.init(Cipher.DECRYPT_MODE, clave);
              
              //el buffer de la entrada y salida de ser bytes
              byte[] bufferPlano;
              in = new FileInputStream(args[0] + ".cifrado");
              out = new FileOutputStream(args[0] + ".descifrado");
              
              //damos lectura de cada elemento 
               bytesleidos = in.read(buffer, 0, 1000);
    //mientras no este al final del archivo que siga leyendo
    while(bytesleidos != -1){
        
        //Pasamos el texto plano a descifrar
        bufferPlano = cifrador.update(buffer, 0, bytesleidos);
        //generamos la salida
        out.write(bufferPlano);    
        bytesleidos = in.read(buffer, 0, 1000);
         }
    //Reuno los bloques
    bufferPlano = cifrador.doFinal();
     
    in.close();
     out.close();
    }

    private static void mensajeAyuda() {
        System.out.println("Este es un ejemplopara poder cifrar" + "archivos de texcto con el algoritmo DES" ); 
    System.out.println("Cuidado con la llave solo puede ser de " + "8 caracteres");
    System.out.println("Compruebe que esta cargando un archivo" + "Como argumento");
            System.out.println("ñam ñam ñam ñam n_n");
            
    }

    private static void mostrarBytes(byte[] encoded) {
       System.out.println("");
    }
    

    
}
