#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Delhi Tandoori Momo Restaurant Website
Tests all backend APIs including Menu, Orders, Reviews, Contact, and Restaurant Info
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL from frontend .env
BACKEND_URL = "...."

class RestaurantAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "errors": []
        }
        
    def log_result(self, test_name, success, message="", response_data=None):
        """Log test results"""
        self.test_results["total_tests"] += 1
        if success:
            self.test_results["passed"] += 1
            print(f"✅ {test_name}: PASSED - {message}")
        else:
            self.test_results["failed"] += 1
            error_msg = f"❌ {test_name}: FAILED - {message}"
            print(error_msg)
            self.test_results["errors"].append(error_msg)
            if response_data:
                print(f"   Response: {response_data}")
    
    def test_health_check(self):
        """Test basic API health check"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                self.log_result("Health Check", True, f"API is running: {data.get('message', '')}")
                return True
            else:
                self.log_result("Health Check", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("Health Check", False, f"Connection error: {str(e)}")
            return False
    
    def test_menu_categories(self):
        """Test GET /api/menu/categories"""
        try:
            response = requests.get(f"{self.base_url}/menu/categories", timeout=10)
            if response.status_code == 200:
                categories = response.json()
                
                # Check if we have categories
                if not categories:
                    self.log_result("Menu Categories", False, "No categories returned")
                    return False
                
                # Check for expected categories
                expected_categories = ["Tandoori Momos", "Afghani Momos", "Chilli Momos", "Steamed Momos"]
                category_names = [cat.get("name", "") for cat in categories]
                
                missing_categories = [cat for cat in expected_categories if cat not in category_names]
                if missing_categories:
                    self.log_result("Menu Categories", False, f"Missing categories: {missing_categories}")
                    return False
                
                # Check structure of each category
                for category in categories:
                    if not all(key in category for key in ["id", "name", "items"]):
                        self.log_result("Menu Categories", False, f"Invalid category structure: {category}")
                        return False
                    
                    # Check items structure
                    for item in category["items"]:
                        required_fields = ["id", "name", "description", "price", "isVeg", "image"]
                        if not all(field in item for field in required_fields):
                            self.log_result("Menu Categories", False, f"Invalid item structure: {item}")
                            return False
                
                self.log_result("Menu Categories", True, f"Found {len(categories)} categories with proper structure")
                return True
            else:
                self.log_result("Menu Categories", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("Menu Categories", False, f"Error: {str(e)}")
            return False
    
    def test_menu_items(self):
        """Test GET /api/menu/items with and without category filter"""
        try:
            # Test all items
            response = requests.get(f"{self.base_url}/menu/items", timeout=10)
            if response.status_code != 200:
                self.log_result("Menu Items (All)", False, f"Status code: {response.status_code}")
                return False
            
            all_items = response.json()
            if not all_items:
                self.log_result("Menu Items (All)", False, "No items returned")
                return False
            
            self.log_result("Menu Items (All)", True, f"Found {len(all_items)} total items")
            
            # Test category filtering
            response = requests.get(f"{self.base_url}/menu/items?category=Tandoori Momos", timeout=10)
            if response.status_code == 200:
                tandoori_items = response.json()
                self.log_result("Menu Items (Filtered)", True, f"Found {len(tandoori_items)} Tandoori Momos items")
                return True
            else:
                self.log_result("Menu Items (Filtered)", False, f"Filter failed with status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_result("Menu Items", False, f"Error: {str(e)}")
            return False
    
    def test_create_order_delivery(self):
        """Test POST /api/orders with delivery type"""
        try:
            order_data = {
                "customer_name": "Rajesh Kumar",
                "customer_phone": "9876543210",
                "customer_email": "rajesh@example.com",
                "delivery_address": "123 MG Road, Bhagalpur, Bihar 812001",
                "delivery_type": "delivery",
                "items": [
                    {
                        "item_id": 1,
                        "name": "Tandoori Chicken Momo",
                        "price": 120,
                        "quantity": 2
                    },
                    {
                        "item_id": 2,
                        "name": "Veg Steamed Momo",
                        "price": 80,
                        "quantity": 1
                    }
                ],
                "payment_method": "razorpay"
            }
            
            response = requests.post(f"{self.base_url}/orders", json=order_data, timeout=10)
            if response.status_code == 200:
                order = response.json()
                
                # Verify order structure
                required_fields = ["order_id", "subtotal", "delivery_charge", "total", "customer_name"]
                if not all(field in order for field in required_fields):
                    self.log_result("Create Order (Delivery)", False, f"Missing fields in response: {order}")
                    return False, None
                
                # Verify calculations
                expected_subtotal = (120 * 2) + (80 * 1)  # 320
                expected_delivery = 30  # delivery charge
                expected_total = expected_subtotal + expected_delivery  # 350
                
                if (order["subtotal"] != expected_subtotal or 
                    order["delivery_charge"] != expected_delivery or 
                    order["total"] != expected_total):
                    self.log_result("Create Order (Delivery)", False, 
                                  f"Calculation error: subtotal={order['subtotal']}, delivery={order['delivery_charge']}, total={order['total']}")
                    return False, None
                
                self.log_result("Create Order (Delivery)", True, 
                              f"Order created: {order['order_id']}, Total: ₹{order['total']}")
                return True, order["order_id"]
            else:
                self.log_result("Create Order (Delivery)", False, f"Status code: {response.status_code}")
                return False, None
                
        except Exception as e:
            self.log_result("Create Order (Delivery)", False, f"Error: {str(e)}")
            return False, None
    
    def test_create_order_pickup(self):
        """Test POST /api/orders with pickup type"""
        try:
            order_data = {
                "customer_name": "Priya Sharma",
                "customer_phone": "8765432109",
                "delivery_type": "pickup",
                "items": [
                    {
                        "item_id": 3,
                        "name": "Chilli Chicken Momo",
                        "price": 140,
                        "quantity": 1
                    }
                ],
                "payment_method": "cod"
            }
            
            response = requests.post(f"{self.base_url}/orders", json=order_data, timeout=10)
            if response.status_code == 200:
                order = response.json()
                
                # Verify no delivery charge for pickup
                if order["delivery_charge"] != 0:
                    self.log_result("Create Order (Pickup)", False, 
                                  f"Pickup should have no delivery charge, got: {order['delivery_charge']}")
                    return False, None
                
                # Verify total calculation
                expected_total = 140  # no delivery charge
                if order["total"] != expected_total:
                    self.log_result("Create Order (Pickup)", False, 
                                  f"Total calculation error: expected {expected_total}, got {order['total']}")
                    return False, None
                
                self.log_result("Create Order (Pickup)", True, 
                              f"Pickup order created: {order['order_id']}, Total: ₹{order['total']}")
                return True, order["order_id"]
            else:
                self.log_result("Create Order (Pickup)", False, f"Status code: {response.status_code}")
                return False, None
                
        except Exception as e:
            self.log_result("Create Order (Pickup)", False, f"Error: {str(e)}")
            return False, None
    
    def test_get_order(self, order_id):
        """Test GET /api/orders/{order_id}"""
        if not order_id:
            self.log_result("Get Order by ID", False, "No order ID provided")
            return False
            
        try:
            response = requests.get(f"{self.base_url}/orders/{order_id}", timeout=10)
            if response.status_code == 200:
                order = response.json()
                if order["order_id"] == order_id:
                    self.log_result("Get Order by ID", True, f"Retrieved order: {order_id}")
                    return True
                else:
                    self.log_result("Get Order by ID", False, f"Order ID mismatch: expected {order_id}, got {order['order_id']}")
                    return False
            elif response.status_code == 404:
                self.log_result("Get Order by ID", False, f"Order not found: {order_id}")
                return False
            else:
                self.log_result("Get Order by ID", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_result("Get Order by ID", False, f"Error: {str(e)}")
            return False
    
    def test_payment_methods(self):
        """Test orders with different payment methods"""
        payment_methods = ["razorpay", "phonepe", "cod"]
        success_count = 0
        
        for method in payment_methods:
            try:
                order_data = {
                    "customer_name": f"Test User {method.title()}",
                    "customer_phone": "9999999999",
                    "delivery_type": "pickup",
                    "items": [
                        {
                            "item_id": 1,
                            "name": "Test Momo",
                            "price": 100,
                            "quantity": 1
                        }
                    ],
                    "payment_method": method
                }
                
                response = requests.post(f"{self.base_url}/orders", json=order_data, timeout=10)
                if response.status_code == 200:
                    order = response.json()
                    if order["payment_method"] == method:
                        success_count += 1
                        self.log_result(f"Payment Method ({method})", True, f"Order created with {method}")
                    else:
                        self.log_result(f"Payment Method ({method})", False, f"Payment method mismatch")
                else:
                    self.log_result(f"Payment Method ({method})", False, f"Status code: {response.status_code}")
                    
            except Exception as e:
                self.log_result(f"Payment Method ({method})", False, f"Error: {str(e)}")
        
        return success_count == len(payment_methods)
    
    def test_reviews(self):
        """Test GET /api/reviews"""
        try:
            response = requests.get(f"{self.base_url}/reviews", timeout=10)
            if response.status_code == 200:
                reviews = response.json()
                
                if len(reviews) >= 4:
                    self.log_result("Get Reviews", True, f"Found {len(reviews)} approved reviews")
                    
                    # Check review structure
                    for review in reviews[:2]:  # Check first 2 reviews
                        required_fields = ["name", "rating", "review", "avatar", "date"]
                        if not all(field in review for field in required_fields):
                            self.log_result("Review Structure", False, f"Invalid review structure: {review}")
                            return False
                    
                    self.log_result("Review Structure", True, "Reviews have proper structure")
                    return True
                else:
                    self.log_result("Get Reviews", False, f"Expected at least 4 reviews, got {len(reviews)}")
                    return False
            else:
                self.log_result("Get Reviews", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_result("Get Reviews", False, f"Error: {str(e)}")
            return False
    
    def test_contact_message(self):
        """Test POST /api/contact"""
        try:
            contact_data = {
                "name": "Amit Singh",
                "phone": "9876543210",
                "email": "amit@example.com",
                "message": "I would like to know about your catering services for a party of 50 people."
            }
            
            response = requests.post(f"{self.base_url}/contact", json=contact_data, timeout=10)
            if response.status_code == 200:
                message = response.json()
                
                # Verify message structure
                required_fields = ["name", "phone", "message", "created_at"]
                if not all(field in message for field in required_fields):
                    self.log_result("Contact Message", False, f"Invalid message structure: {message}")
                    return False
                
                if message["name"] == contact_data["name"] and message["phone"] == contact_data["phone"]:
                    self.log_result("Contact Message", True, f"Message saved from {message['name']}")
                    return True
                else:
                    self.log_result("Contact Message", False, "Message data mismatch")
                    return False
            else:
                self.log_result("Contact Message", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_result("Contact Message", False, f"Error: {str(e)}")
            return False
    
    def test_restaurant_info(self):
        """Test GET /api/restaurant/info"""
        try:
            response = requests.get(f"{self.base_url}/restaurant/info", timeout=10)
            if response.status_code == 200:
                info = response.json()
                
                # Check required fields
                required_fields = ["name", "englishName", "phone", "address", "timings"]
                if not all(field in info for field in required_fields):
                    self.log_result("Restaurant Info", False, f"Missing required fields: {info}")
                    return False
                
                if "दिल्ली तंदूरी मोमो" in info["name"]:
                    self.log_result("Restaurant Info", True, f"Restaurant info retrieved: {info['englishName']}")
                    return True
                else:
                    self.log_result("Restaurant Info", False, "Restaurant name mismatch")
                    return False
            else:
                self.log_result("Restaurant Info", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_result("Restaurant Info", False, f"Error: {str(e)}")
            return False
    
    def test_edge_cases(self):
        """Test edge cases and error handling"""
        edge_case_results = []
        
        # Test invalid order data
        try:
            invalid_order = {
                "customer_name": "",  # Empty name
                "customer_phone": "invalid",  # Invalid phone
                "delivery_type": "delivery",
                "items": [],  # Empty cart
                "payment_method": "razorpay"
            }
            
            response = requests.post(f"{self.base_url}/orders", json=invalid_order, timeout=10)
            if response.status_code >= 400:
                self.log_result("Edge Case (Invalid Order)", True, "Properly rejected invalid order")
                edge_case_results.append(True)
            else:
                self.log_result("Edge Case (Invalid Order)", False, "Should reject invalid order data")
                edge_case_results.append(False)
                
        except Exception as e:
            self.log_result("Edge Case (Invalid Order)", False, f"Error: {str(e)}")
            edge_case_results.append(False)
        
        # Test non-existent order
        try:
            fake_order_id = "NONEXISTENT123"
            response = requests.get(f"{self.base_url}/orders/{fake_order_id}", timeout=10)
            if response.status_code == 404:
                self.log_result("Edge Case (Non-existent Order)", True, "Properly returned 404 for non-existent order")
                edge_case_results.append(True)
            else:
                self.log_result("Edge Case (Non-existent Order)", False, f"Expected 404, got {response.status_code}")
                edge_case_results.append(False)
                
        except Exception as e:
            self.log_result("Edge Case (Non-existent Order)", False, f"Error: {str(e)}")
            edge_case_results.append(False)
        
        return all(edge_case_results)
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting Delhi Tandoori Momo Backend API Tests")
        print(f"🔗 Testing Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test sequence
        health_ok = self.test_health_check()
        if not health_ok:
            print("❌ Backend is not accessible. Stopping tests.")
            return self.test_results
        
        # Menu API tests
        print("\n📋 Testing Menu APIs...")
        self.test_menu_categories()
        self.test_menu_items()
        
        # Order API tests
        print("\n🛒 Testing Order APIs...")
        delivery_success, delivery_order_id = self.test_create_order_delivery()
        pickup_success, pickup_order_id = self.test_create_order_pickup()
        
        # Test order retrieval
        if delivery_order_id:
            self.test_get_order(delivery_order_id)
        if pickup_order_id:
            self.test_get_order(pickup_order_id)
        
        # Test payment methods
        self.test_payment_methods()
        
        # Review API tests
        print("\n⭐ Testing Review APIs...")
        self.test_reviews()
        
        # Contact API tests
        print("\n📞 Testing Contact APIs...")
        self.test_contact_message()
        
        # Restaurant info tests
        print("\n🏪 Testing Restaurant Info APIs...")
        self.test_restaurant_info()
        
        # Edge case tests
        print("\n🧪 Testing Edge Cases...")
        self.test_edge_cases()
        
        return self.test_results
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.test_results['total_tests']}")
        print(f"✅ Passed: {self.test_results['passed']}")
        print(f"❌ Failed: {self.test_results['failed']}")
        
        if self.test_results['failed'] > 0:
            print(f"\n🚨 FAILED TESTS:")
            for error in self.test_results['errors']:
                print(f"   {error}")
        
        success_rate = (self.test_results['passed'] / self.test_results['total_tests']) * 100 if self.test_results['total_tests'] > 0 else 0
        print(f"\n📈 Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 90:
            print("🎉 Excellent! Backend APIs are working well.")
        elif success_rate >= 70:
            print("⚠️  Good, but some issues need attention.")
        else:
            print("🚨 Critical issues found. Backend needs fixes.")

def main():
    """Main test execution"""
    tester = RestaurantAPITester()
    results = tester.run_all_tests()
    tester.print_summary()
    
    # Exit with appropriate code
    if results['failed'] > 0:
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == "__main__":
    main()
