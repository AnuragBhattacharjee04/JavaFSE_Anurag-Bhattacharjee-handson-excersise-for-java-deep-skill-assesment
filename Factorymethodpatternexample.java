
public class FactoryMethodPatternExample {
    interface Shape {
        void draw();
        double area();
    }

    static class Circle implements Shape {
        private double radius;

        public Circle(double radius) {
            this.radius = radius;
        }

        @Override
        public void draw() {
            System.out.println("Drawing Circle with radius: " + radius);
        }

        @Override
        public double area() {
            return Math.PI * radius * radius;
        }
    }

    static class Rectangle implements Shape {
        private double width, height;

        public Rectangle(double width, double height) {
            this.width = width;
            this.height = height;
        }

        @Override
        public void draw() {
            System.out.println("Drawing Rectangle [" + width + " x " + height + "]");
        }

        @Override
        public double area() {
            return width * height;
        }
    }

    static class Triangle implements Shape {
        private double base, height;

        public Triangle(double base, double height) {
            this.base = base;
            this.height = height;
        }

        @Override
        public void draw() {
            System.out.println("Drawing Triangle with base: " + base + " and height: " + height);
        }

        @Override
        public double area() {
            return 0.5 * base * height;
        }
    }

    static abstract class ShapeFactory {
        public abstract Shape createShape();
        public void renderShape() {
            Shape shape = createShape();
            shape.draw();
            System.out.printf("Area: %.2f%n", shape.area());
        }
    }

    static class CircleFactory extends ShapeFactory {
        private double radius;
        CircleFactory(double radius) { this.radius = radius; }

        @Override
        public Shape createShape() {
            return new Circle(radius);
        }
    }

    static class RectangleFactory extends ShapeFactory {
        private double w, h;
        RectangleFactory(double w, double h) { this.w = w; this.h = h; }

        @Override
        public Shape createShape() {
            return new Rectangle(w, h);
        }
    }

    static class TriangleFactory extends ShapeFactory {
        private double base, height;
        TriangleFactory(double base, double height) { this.base = base; this.height = height; }

        @Override
        public Shape createShape() {
            return new Triangle(base, height);
        }
    }
    static class SimpleShapeFactory {
        public static Shape getShape(String type) {
            switch (type.toUpperCase()) {
                case "CIRCLE":    return new Circle(5.0);
                case "RECTANGLE": return new Rectangle(4.0, 6.0);
                case "TRIANGLE":  return new Triangle(3.0, 8.0);
                default: throw new IllegalArgumentException("Unknown shape: " + type);
            }
        }
    }
    public static void main(String[] args) {
        System.out.println("=== Factory Method Pattern Demo ===\n");
        ShapeFactory circleFactory    = new CircleFactory(7.0);
        ShapeFactory rectangleFactory = new RectangleFactory(5.0, 10.0);
        ShapeFactory triangleFactory  = new TriangleFactory(6.0, 4.0);

        circleFactory.renderShape();
        System.out.println();
        rectangleFactory.renderShape();
        System.out.println();
        triangleFactory.renderShape();

        System.out.println("\n=== Simple Factory Demo ===\n");
        String[] types = {"CIRCLE", "RECTANGLE", "TRIANGLE"};
        for (String t : types) {
            Shape s = SimpleShapeFactory.getShape(t);
            s.draw();
            System.out.printf("Area: %.2f%n%n", s.area());
        }
    }
}