using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwitterTowers
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.UTF8;
            Console.InputEncoding = Encoding.UTF8;

            Console.SetIn(new StreamReader(Console.OpenStandardInput(), Console.InputEncoding, false, 1024));
            Console.SetOut(new StreamWriter(Console.OpenStandardOutput(), Console.OutputEncoding) { AutoFlush = true });
            int choice;

            do
            {
                Console.WriteLine("Choose one of the following options:");
                Console.WriteLine("Press 1 to build a rectangle tower");
                Console.WriteLine("Press 2 to build a triangle tower");
                Console.WriteLine("Press 3 to exit");
                Console.Write("Your choice: ");

                choice = int.Parse(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        Console.Write("Enter the length of the rectangle tower: ");
                        double lengthR = double.Parse(Console.ReadLine());
                        Console.Write("Enter the height of the rectangle tower: ");
                        double heightR = double.Parse(Console.ReadLine());
                        while (heightR< 2)
                        {
                            Console.Write("The height of the rectangle tower must be greater than or equal to 2 ");
                            Console.Write("Enter the height of the rectangle tower: ");
                            heightR= double.Parse(Console.ReadLine());
                        }
                        RectangleTower(lengthR, heightR);
                        break;
                    case 2:
                        Console.Write("Enter the length of the triangle tower: ");
                        double lengthT = double.Parse(Console.ReadLine());
                        Console.Write("Enter the height of the triangle tower: ");
                        double heightT = double.Parse(Console.ReadLine());
                        while (heightT < 2)
                        {
                            Console.Write("The height of the triangle tower must be greater than or equal to 2 ");
                            Console.Write("Enter the height of the triangle tower: ");
                            heightT = double.Parse(Console.ReadLine());
                        }
                        TriangleTower(lengthT, heightT);
                        break;
                    case 3:
                        Console.WriteLine("Exiting the program...");
                        break;
                    default:
                        Console.WriteLine("Invalid choice! Please enter one of the options listed");
                        break;
                }
            } while (choice != 3);
        }
        static void RectangleTower(double length, double height)
        {
            if (length == height || Math.Abs(length - height) > 5)
                Console.WriteLine($"The area of the rectangle is: {length * height}");
            else
                Console.WriteLine($"The perimeter of the rectangle is: {(length + height)*2}");

        }

        static void TriangleTower(double length, double height)
        {
            Console.WriteLine("Choose an option:");
            Console.WriteLine("1. Calculate the perimeter of the triangle.");
            Console.WriteLine("2. Print the triangle.");
            int choice = int.Parse(Console.ReadLine());

            if (choice == 1)
            {
                double sideLength = Math.Sqrt(Math.Pow(length / 2, 2) + Math.Pow(height, 2));
                double perimeter = length + 2 * sideLength;
                Console.WriteLine($"The perimeter of the triangle is: {perimeter}");
            }
            else if (choice == 2)
            {
                if (length % 2 == 0 || height * 2 < length)
                {
                    Console.WriteLine("The triangle cannot be printed");
                    return;
                }

                int times = (int)Math.Floor((length - 2) / 2);
                int amount = (int)((height - 2) / times);
                int remainder = (int)((height - 2) - amount * times);
                int space = 49, numStars = 3;
                for (int i = 0; i < space; i++) Console.Write(" ");
                Console.Write("*");
                Console.WriteLine();
                space--;
                for (int i = 0; i < remainder; i++)
                {
                    for (int k = 0; k < space; k++) { Console.Write(" "); }
                    for (int k = 0; k < numStars; k++) { Console.Write("*"); }
                    Console.WriteLine();
                }
                for (int i = 1; i <= times; i++)
                {
                    for (int j = 1; j <= amount; j++)
                    {
                        for (int k = 0; k < space; k++) { Console.Write(" "); }
                        for (int k = 0; k < numStars; k++) { Console.Write("*"); }
                        Console.WriteLine();
                    }
                    numStars += 2;
                    space--;
                }
                for (int i = 0; i < space; i++) { Console.Write(" "); }
                for (int i = 0; i < numStars; i++) { Console.Write("*"); }
                Console.WriteLine();
            }
            else
            {
                Console.WriteLine("Invalid choice! Please enter one of the options listed");
            }
        }

    }
}
