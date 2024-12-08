package ir.baki.app

import android.content.Intent
import android.net.Uri
import android.os.Build
import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResultRegistry
import androidx.core.content.ContextCompat.startActivity
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.google.gson.Gson
import ir.cafebazaar.poolakey.BuildConfig
import ir.cafebazaar.poolakey.Connection
import ir.cafebazaar.poolakey.Payment
import ir.cafebazaar.poolakey.config.PaymentConfiguration
import ir.cafebazaar.poolakey.config.SecurityCheck
import ir.cafebazaar.poolakey.request.PurchaseRequest


@CapacitorPlugin(name = "Bazar")
class BazarPlugin : Plugin() {


    @PluginMethod
    fun connect(call: PluginCall) {
        paymentConnection = payment.connect {
            connectionSucceed {
                call.resolve()
            }
            connectionFailed {
                call.reject("CONNECTION_FAILED")
            }

        }
    }

    @PluginMethod
    fun startPayment(call: PluginCall) {
        val productId = call.getString("productId")
        val payload = call.getString("payload")
        val dynamicPriceToken = call.getString("dynamicPriceToken")

        val purchaseRequest = PurchaseRequest(
            productId = productId!!,
            payload = payload!!,
            dynamicPriceToken = dynamicPriceToken
        )
        payment.purchaseProduct(
            registry = activityResultRegistry,
            request = purchaseRequest,
        ) {
            purchaseSucceed {
                call.resolve(JSObject(Gson().toJson(it)))
            }
            purchaseFailed {
                call.reject("PAYMENT_FAILED")
            }
            purchaseCanceled {
                call.reject("CANCELLED")
            }
        }
    }

    @PluginMethod
    fun consumePurchase(call: PluginCall) {
        val purchaseToken = call.getString("purchaseToken")
        payment.consumeProduct(purchaseToken!!) {
            consumeSucceed {
                call.resolve()
            }
            consumeFailed {
                call.reject("CONSUME_FAILED")
            }
        }
    }

    @PluginMethod
    fun getAllPurchases(call: PluginCall) {
        payment.getPurchasedProducts {
            querySucceed { purchases ->
                call.resolve(JSObject(Gson().toJson(purchases)))
            }
            queryFailed {
                call.reject("QUERY_FAILED")
            }
        }
    }


    companion object {
        private lateinit var payment: Payment
        private lateinit var activityResultRegistry: ActivityResultRegistry;
        private var paymentConnection: Connection? = null

        fun init(context: ComponentActivity) {
            activityResultRegistry = context.activityResultRegistry
            payment = Payment(
                context,
                PaymentConfiguration(
                    SecurityCheck.Enable(
                        context.getString(R.string.bazar_key)
                    )
                )
            )

        }

        fun disconnect() {
            paymentConnection?.disconnect()
        }
    }


    @PluginMethod
    fun addComment(call: PluginCall) {
        val intent = Intent(Intent.ACTION_EDIT)
        intent.setData(Uri.parse("bazaar://details?id=" + "ir.chibokhorim.app"))
        intent.setPackage("com.farsitel.bazaar")
        startActivity(this.bridge.context, intent, null)
        call.resolve()
    }

}
