
public class SingletonPatternExample {

    static class Logger {
        private static Logger instance;
        private Logger() {
            System.out.println("Logger instance created.");
        }
        public static Logger getInstance() {
            if (instance == null) {
                instance = new Logger();
            }
            return instance;
        }
        public void log(String message) {
            System.out.println("[LOG] " + message);
        }

        public void warn(String message) {
            System.out.println("[WARN] " + message);
        }

        public void error(String message) {
            System.out.println("[ERROR] " + message);
        }
    }

    static class ThreadSafeLogger {
        private static volatile ThreadSafeLogger instance;

        private ThreadSafeLogger() {}
        public static ThreadSafeLogger getInstance() {
            if (instance == null) {
                synchronized (ThreadSafeLogger.class) {
                    if (instance == null) {
                        instance = new ThreadSafeLogger();
                    }
                }
            }
            return instance;
        }

        public void log(String message) {
            System.out.println("[THREAD-SAFE LOG] " + message);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Singleton Pattern Demo ===\n");
        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();
        System.out.println("logger1 == logger2 : " + (logger1 == logger2));   
        System.out.println("logger1 hashCode   : " + logger1.hashCode());
        System.out.println("logger2 hashCode   : " + logger2.hashCode());
        logger1.log("Application started");
        logger2.warn("Low memory warning");
        logger1.error("Null pointer encountered");

        System.out.println("\n=== Thread-Safe Singleton Demo ===\n");
        ThreadSafeLogger ts1 = ThreadSafeLogger.getInstance();
        ThreadSafeLogger ts2 = ThreadSafeLogger.getInstance();
        System.out.println("ts1 == ts2 : " + (ts1 == ts2));
        ts1.log("Thread-safe logging works!");
    }
}